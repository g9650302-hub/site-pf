/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
var NomeIcao = (function () {
    function NomeIcao(_nomeCompleto, _nome, _sobrenome, gerarNomeSobrenome) {
        var _this = this;
        if (((typeof _nomeCompleto === 'string') || _nomeCompleto === null) && ((typeof _nome === 'string') || _nome === null) && ((typeof _sobrenome === 'string') || _sobrenome === null) && ((typeof gerarNomeSobrenome === 'boolean') || gerarNomeSobrenome === null)) {
            var __args = Array.prototype.slice.call(arguments);
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            (function () {
                _this.inicializaNomeIcao(_nomeCompleto, _nome, _sobrenome, gerarNomeSobrenome);
            })();
        }
        else if (((typeof _nomeCompleto === 'string') || _nomeCompleto === null) && ((typeof _nome === 'string') || _nome === null) && ((typeof _sobrenome === 'string') || _sobrenome === null) && gerarNomeSobrenome === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            (function () {
                _this.inicializaNomeIcao(_nomeCompleto, _nome, _sobrenome, false);
            })();
        }
        else if (((typeof _nomeCompleto === 'string') || _nomeCompleto === null) && ((typeof _nome === 'number') || _nome === null) && _sobrenome === undefined && gerarNomeSobrenome === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            var totalPalavrasPrenome_1 = __args[1];
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            (function () {
                _this.nomeCompleto = _nomeCompleto;
                _this.tamanhoPrenome = totalPalavrasPrenome_1;
                _this.gerarNomeSobrenome(_this.tamanhoPrenome);
                _this.gerarIdentificadores();
            })();
        }
        else if (((typeof _nomeCompleto === 'string') || _nomeCompleto === null) && _nome === undefined && _sobrenome === undefined && gerarNomeSobrenome === undefined) {
            var __args = Array.prototype.slice.call(arguments);
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            this.nomeCompleto = null;
            this.nome = null;
            this.sobrenome = null;
            this.tamanhoPrenome = 0;
            this.identificadorPrimario = null;
            this.identificadorSecundario = null;
            (function () {
                _this.nomeCompleto = _nomeCompleto;
                _this.tamanhoPrenome = 1;
                _this.gerarNomeSobrenome(1);
                _this.gerarIdentificadores();
            })();
        }
        else
            throw new Error('invalid overload');
    }
    NomeIcao.PREPOSICOES_$LI$ = function () { if (NomeIcao.PREPOSICOES == null)
        NomeIcao.PREPOSICOES = ["DA", "DAS", "DE", "DO", "DOS", "E", "DEL"]; return NomeIcao.PREPOSICOES; };
    ;
    NomeIcao.PREPOSICOES_COMPOSTAS_$LI$ = function () { if (NomeIcao.PREPOSICOES_COMPOSTAS == null)
        NomeIcao.PREPOSICOES_COMPOSTAS = ["DE LA"]; return NomeIcao.PREPOSICOES_COMPOSTAS; };
    ;
    NomeIcao.SOBRENOMES_ESPECIAIS_$LI$ = function () { if (NomeIcao.SOBRENOMES_ESPECIAIS == null)
        NomeIcao.SOBRENOMES_ESPECIAIS = ["SOBRINHO", "J??NIOR", "JUNIOR", "SOBRINHO", "SOBRINHA", "FILHO", "FILHA", "NETO", "NETA", "BISNETO", "BISNETA", "SEGUNDO", "SEGUNDA", "TERCEIRO", "TERCEIRA"]; return NomeIcao.SOBRENOMES_ESPECIAIS; };
    ;
    NomeIcao.CARACTERES_$LI$ = function () { if (NomeIcao.CARACTERES == null)
        NomeIcao.CARACTERES = ["\'", "`", "~", "^", "??"]; return NomeIcao.CARACTERES; };
    ;
    NomeIcao.prototype.isNomeCompostoDisponivel = function () {
        var listaPreposicoesCompostas = NomeIcao.PREPOSICOES_COMPOSTAS_$LI$().slice(0);
        var listaPreposicoes = NomeIcao.PREPOSICOES_$LI$().slice(0);
        var palavrasNomeCompleto = this.reajustarPalavras(this.getTokens(this.nomeCompleto));
        var retorno = false;
        if (palavrasNomeCompleto.length > 3) {
            retorno = true;
        }
        else if (palavrasNomeCompleto.length === 3) {
            var i = 0;
            var palavra = null;
            var temPreposicao = false;
            while ((i < palavrasNomeCompleto.length && !temPreposicao)) {
                palavra = palavrasNomeCompleto[i];
                temPreposicao = (i > 0 && ((listaPreposicoes.indexOf((palavra)) >= 0) || (listaPreposicoesCompostas.indexOf((palavra)) >= 0))) ? true : false;
                i++;
            }
            ;
            retorno = !temPreposicao;
        }
        return retorno;
    };
    NomeIcao.prototype.setNomeComposto = function () {
        var listaPreposicoesCompostas = NomeIcao.PREPOSICOES_COMPOSTAS_$LI$().slice(0);
        var listaPreposicoes = NomeIcao.PREPOSICOES_$LI$().slice(0);
        var palavrasNomeCompleto = this.reajustarPalavras(this.getTokens(this.nomeCompleto));
        if (palavrasNomeCompleto.length > 2) {
            this.tamanhoPrenome = 2;
            var segundaPalavra = palavrasNomeCompleto[1];
            if ((listaPreposicoes.indexOf((segundaPalavra)) >= 0)) {
                this.tamanhoPrenome = 3;
            }
            else if ((listaPreposicoesCompostas.indexOf((segundaPalavra)) >= 0)) {
                this.tamanhoPrenome = 4;
            }
            this.gerarNomeSobrenome(this.tamanhoPrenome);
            this.gerarIdentificadores();
        }
        return this.tamanhoPrenome;
    };
    /*private*/ NomeIcao.prototype.inicializaNomeIcao = function (_nomeCompleto, _nome, _sobrenome, gerarNomeSobrenome) {
        this.nomeCompleto = _nomeCompleto;
        if (_sobrenome == null || (function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(_sobrenome.trim(), "")) {
            this.sobrenome = _nome;
            this.nome = "";
        }
        else {
            this.nome = _nome;
            this.sobrenome = _sobrenome;
        }
        if (gerarNomeSobrenome) {
            this.gerarNomeSobrenome(this.getNumPalavrasPrenome(this.nomeCompleto, this.nome));
        }
        this.tamanhoPrenome = this.getNumPalavrasPrenome(this.nomeCompleto, this.nome);
        this.gerarIdentificadores();
    };
    /**
     * Retorna o n??mero de palavras que comp??e o prenome
     * @param {string} nomeCompleto
     * @param {string} nome
     * @return
     * @return {number}
     * @private
     */
    /*private*/ NomeIcao.prototype.getNumPalavrasPrenome = function (nomeCompleto, nome) {
        var numPalavras = 0;
        var listaPreposicoesCompostas = NomeIcao.PREPOSICOES_COMPOSTAS_$LI$().slice(0);
        var listaPreposicoes = NomeIcao.PREPOSICOES_$LI$().slice(0);
        var palavrasNomeCompleto = this.reajustarPalavras(this.getTokens(nomeCompleto));
        var palavrasPrenome = this.reajustarPalavras(this.getTokens(nome));
        var ehPreposicao = false;
        var palavra = null;
        var p = null;
        var i = 0;
        while ((i < palavrasPrenome.length)) {
            palavra = palavrasNomeCompleto[numPalavras];
            p = palavrasPrenome[i];
            ehPreposicao = (listaPreposicoes.indexOf((palavra)) >= 0) || (listaPreposicoesCompostas.indexOf((palavra)) >= 0) ? true : false;
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(p.substring(0, 1), palavra.substring(0, 1))) {
                i++;
                numPalavras++;
            }
            else if (ehPreposicao) {
                numPalavras++;
            }
            else {
                numPalavras = palavrasPrenome.length;
                this.gerarNomeSobrenome(numPalavras);
                break;
            }
        }
        ;
        return numPalavras;
    };
    /**
     * Retorna identificador primario (inclui sobrenome)
     * @return {string}
     */
    NomeIcao.prototype.getIdentificadorPrimario = function () {
        return this.identificadorPrimario;
    };
    /**
     * Retorna identificador secundario (inicio do nome)
     * @return {string}
     */
    NomeIcao.prototype.getIdentificadorSecundario = function () {
        return this.identificadorSecundario;
    };
    NomeIcao.prototype.getNome = function () {
        return this.nome;
    };
    NomeIcao.prototype.getSobrenome = function () {
        return this.sobrenome;
    };
    NomeIcao.prototype.getTamanhoPrenome = function () {
        return this.tamanhoPrenome;
    };
    /**
     * Verifica se a palavra excede o tamanho m??ximo definido e abrevia quando aplic??vel
     * @param {string} palavra
     * @return {string} palavra
     * @private
     */
    /*private*/ NomeIcao.prototype.truncarPalavra = function (palavra) {
        if (palavra.length > NomeIcao.TAM_MAX_UNICO_ID) {
            return palavra.substring(0, NomeIcao.TAM_MAX_UNICO_ID).trim();
        }
        return palavra;
    };
    /*private*/ NomeIcao.prototype.truncarInicial$java_lang_String = function (palavra) {
        return palavra.substring(0, 1);
    };
    NomeIcao.prototype.truncarInicial$java_lang_String$boolean = function (palavra, condicao) {
        if (condicao) {
            return this.truncarInicial$java_lang_String(palavra);
        }
        return palavra;
    };
    NomeIcao.prototype.truncarInicial = function (palavra, condicao) {
        if (((typeof palavra === 'string') || palavra === null) && ((typeof condicao === 'boolean') || condicao === null)) {
            return this.truncarInicial$java_lang_String$boolean(palavra, condicao);
        }
        else if (((typeof palavra === 'string') || palavra === null) && condicao === undefined) {
            return this.truncarInicial$java_lang_String(palavra);
        }
        else
            throw new Error('invalid overload');
    };
    /**
     * Verifica se h?? preposi????es compostas e reagrupa os tokens caso necess??rio
     * @param {string[]} tokens
     * @return
     * @return {string[]}
     * @private
     */
    /*private*/ NomeIcao.prototype.reajustarPalavras = function (tokens) {
        var listaPalavras = ([]);
        var listaPreposicoesCompostas = NomeIcao.PREPOSICOES_COMPOSTAS_$LI$().slice(0);
        if (tokens != null) {
	        for (var i = 0; i < tokens.length; i++) {
	            if (i === tokens.length - 1) {
	                /* add */ (listaPalavras.push(/* get */ tokens[i]) > 0);
	            }
	            else {
	                var palavra = tokens[i] + " " + tokens[i + 1];
	                if ((listaPreposicoesCompostas.indexOf((palavra)) >= 0)) {
	                    /* add */ (listaPalavras.push(palavra) > 0);
	                    i++;
	                }
	                else {
	                    /* add */ (listaPalavras.push(/* get */ tokens[i]) > 0);
	                }
	            }
	        }
        }
        ;
        return listaPalavras;
    };
    /**
     * Remove as preposi????es da cadeia de caracteres
     * @param {string} cadeia
     * @return {string} cadeia sem as preposi????es
     * @param {boolean} ehPrenome
     * @private
     */
    /*private*/ NomeIcao.prototype.removerPreposicoes = function (cadeia, ehPrenome) {
        var palavras = this.reajustarPalavras(this.getTokens(cadeia));
        var listaPreposicoes = NomeIcao.PREPOSICOES_$LI$().slice(0);
        var listaPreposicoesCompostas = NomeIcao.PREPOSICOES_COMPOSTAS_$LI$().slice(0);
        var i = palavras.length - 1;
        var limite = ehPrenome ? 1 : 0;
        while ((cadeia.length > NomeIcao.TAM_MAX_UNICO_ID && i-- > limite)) {
            palavras = this.reajustarPalavras(this.getTokens(cadeia));
            if ((listaPreposicoes.indexOf((palavras[i])) >= 0) || (listaPreposicoesCompostas.indexOf((palavras[i])) >= 0)) {
                /* remove */ palavras.splice(i, 1);
                if (i > 0 && (listaPreposicoes.indexOf((palavras[i - 1])) >= 0)) {
                    /* remove */ palavras.splice(i - 1, 1);
                }
            }
            cadeia = "";
            for (var index2863 = 0; index2863 < palavras.length; index2863++) {
                var p = palavras[index2863];
                {
                    if (!(function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(cadeia, "")) {
                        cadeia += " ";
                    }
                    cadeia += p;
                }
            }
        }
        ;
        return cadeia;
    };
    /**
     * Remove as preposi????es da cadeia de 60 caracteres
     * @param {string} cadeia
     * @return {string} cadeia sem as preposi????es
     * @param {boolean} ehPrenome
     * @private
     */
    /*private*/ NomeIcao.prototype.removerPreposicoesGenitor = function (cadeia, ehPrenome) {
        var palavras = this.reajustarPalavras(this.getTokens(cadeia));
        var listaPreposicoes = NomeIcao.PREPOSICOES_$LI$().slice(0);
        var listaPreposicoesCompostas = NomeIcao.PREPOSICOES_COMPOSTAS_$LI$().slice(0);
        var i = palavras.length - 1;
        var limite = ehPrenome ? 1 : 0;
        while ((cadeia.length > 60 && i-- > limite)) {
            palavras = this.reajustarPalavras(this.getTokens(cadeia));
            if ((listaPreposicoes.indexOf((palavras[i])) >= 0) || (listaPreposicoesCompostas.indexOf((palavras[i])) >= 0)) {
                /* remove */ palavras.splice(i, 1);
                if (i > 0 && (listaPreposicoes.indexOf((palavras[i - 1])) >= 0)) {
                    /* remove */ palavras.splice(i - 1, 1);
                }
            }
            cadeia = "";
            for (var index2864 = 0; index2864 < palavras.length; index2864++) {
                var p = palavras[index2864];
                {
                    if (!(function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(cadeia, "")) {
                        cadeia += " ";
                    }
                    cadeia += p;
                }
            }
        }
        ;
        return cadeia;
    };
    /**
     * Trunca as iniciais quando aplic??vel
     * @param {string} cadeia
     * @param {number} tipoCadeia
     * @return {string}
     * @private
     */
    /*private*/ NomeIcao.prototype.truncarIniciais = function (cadeia, tipoCadeia) {
        var processamentos = 0;
        var palavra = cadeia;
        while ((palavra.length > NomeIcao.TAM_MAX_UNICO_ID)) {
            var palavras = this.getTokens(palavra);
            var inicio = this.calcularPonteiroVaredura(palavras, tipoCadeia);
            var fim = 0;
            if (tipoCadeia === 1)
                fim = 1;
            if (processamentos < 2) {
                for (var i = inicio; i >= fim; i--) {
                    if (processamentos === 0) {
                        /* set */ (palavras[i] = this.truncarInicial$java_lang_String$boolean(/* get */ palavras[i], !(function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(/* get */ palavras[i], "D\'")));
                    }
                    else if (processamentos === 1) {
                        /* set */ (palavras[i] = this.truncarInicial$java_lang_String$boolean(/* get */ palavras[i], /* startsWith */ (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(/* get */ palavras[i], "D\'")));
                    }
                    palavra = this.concatenarPalavras(palavras, NomeIcao.SEPARADOR);
                    if (palavra.length <= NomeIcao.TAM_MAX_UNICO_ID) {
                        break;
                    }
                }
                ;
                palavra = this.concatenarPalavras(palavras, NomeIcao.SEPARADOR);
            }
            else {
                if ((processamentos === 2 || processamentos === 3) && tipoCadeia === 2 && this.ehSobreNomeEspecial(/* get */ palavras[palavras.length - 1])) {
                    if (palavras[palavras.length - 1].length > 0) {
                        /* set */ (palavras[palavras.length - 1] = this.truncarInicial$java_lang_String(/* get */ palavras[palavras.length - 1]));
                    }
                    else {
                        /* set */ (palavras[palavras.length - 2] = this.truncarInicial$java_lang_String(/* get */ palavras[palavras.length - 2]));
                    }
                    palavra = this.concatenarPalavras(palavras, NomeIcao.SEPARADOR);
                }
                else {
                    palavra = this.truncarPalavra(this.concatenarPalavras(palavras, NomeIcao.SEPARADOR));
                }
            }
            if (palavra.length <= NomeIcao.TAM_MAX_UNICO_ID) {
                break;
            }
            processamentos += 1;
        }
        ;
        return palavra;
    };
    /**
     * Trunca as iniciais quando aplic??vel
     * @param {string} cadeia
     * @param {number} tipoCadeia
     * @return {string}
     * @private
     */
    /*private*/ NomeIcao.prototype.truncarIniciaisGenitor = function (cadeia, tipoCadeia) {
        var processamentos = 0;
        var palavra = cadeia;
        while ((palavra.length > 60)) {
            var palavras = this.getTokens(palavra);
            var inicio = this.calcularPonteiroVaredura(palavras, tipoCadeia);
            var fim = 0;
            if (tipoCadeia === 1)
                fim = 1;
            if (processamentos < 2) {
                for (var i = inicio; i >= fim; i--) {
                    if (processamentos === 0) {
                        /* set */ (palavras[i] = this.truncarInicial$java_lang_String$boolean(/* get */ palavras[i], !(function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(/* get */ palavras[i], "D\'")));
                    }
                    else if (processamentos === 1) {
                        /* set */ (palavras[i] = this.truncarInicial$java_lang_String$boolean(/* get */ palavras[i], /* startsWith */ (function (str, searchString, position) {
                            if (position === void 0) { position = 0; }
                            return str.substr(position, searchString.length) === searchString;
                        })(/* get */ palavras[i], "D\'")));
                    }
                    palavra = this.concatenarPalavras(palavras, NomeIcao.SEPARADOR);
                    if (palavra.length <= 60) {
                        break;
                    }
                }
                ;
                palavra = this.concatenarPalavras(palavras, NomeIcao.SEPARADOR);
            }
            else {
                if ((processamentos === 2 || processamentos === 3) && tipoCadeia === 2 && this.ehSobreNomeEspecial(/* get */ palavras[palavras.length - 1])) {
                    if (palavras[palavras.length - 1].length > 0) {
                        /* set */ (palavras[palavras.length - 1] = this.truncarInicial$java_lang_String(/* get */ palavras[palavras.length - 1]));
                    }
                    else {
                        /* set */ (palavras[palavras.length - 2] = this.truncarInicial$java_lang_String(/* get */ palavras[palavras.length - 2]));
                    }
                    palavra = this.concatenarPalavras(palavras, NomeIcao.SEPARADOR);
                }
                else {
                    palavra = this.truncarPalavra(this.concatenarPalavras(palavras, NomeIcao.SEPARADOR));
                }
            }
            if (palavra.length <= 60) {
                break;
            }
            processamentos += 1;
        }
        ;
        return palavra;
    };
    /**
     * Verifica se o sobre nome pertence ao conjunto de sobrenomes especiais definidos na variavel SOBRENOMES_ESPECIAIS
     * @param {string} sobreNome
     * @return
     * @return {boolean}
     * @private
     */
    /*private*/ NomeIcao.prototype.ehSobreNomeEspecial = function (sobreNome) {
        var sobreNomesEspecias = ([]);
        sobreNomesEspecias = NomeIcao.SOBRENOMES_ESPECIAIS_$LI$().slice(0);
        return (sobreNomesEspecias.indexOf((sobreNome)) >= 0);
    };
    /**
     *
     * @param {string[]} palavras
     * @param {number} tipoCadeia
     * @return
     * @return {number}
     * @private
     */
    /*private*/ NomeIcao.prototype.calcularPonteiroVaredura = function (palavras, tipoCadeia) {
        var ponteiro = 0;
        if (tipoCadeia === 2) {
            if (this.ehSobreNomeEspecial(/* get */ palavras[palavras.length - 1])) {
                if ((palavras.length - 3) > 0)
                    ponteiro = palavras.length - 3;
            }
            else {
                if (palavras.length - 2 > 0)
                    ponteiro = palavras.length - 2;
            }
        }
        if (tipoCadeia === 1) {
            ponteiro = palavras.length - 1;
        }
        return ponteiro;
    };
    /**
     * Configura os campos nome e sobrenome a partir do nome completo levando em considera????o
     * o n??mero de palavras (n??o-preposi????o ) passadas como par??metro
     * @param {number} ind
     * @param valorInicial gera o valor inicial do nome e sobrenome
     * @private
     */
    /*private*/ NomeIcao.prototype.gerarNomeSobrenome = function (ind) {
        this.sobrenome = "";
        this.nome = "";
        var palavrasPrenome = ([]);
        var palavrasSobrenome = ([]);
        if (this.nomeCompleto != null && this.nomeCompleto.trim().length > 0) {
            var tmp2 = "";
            var tmp1 = "";
            var tokens = this.getTokens(this.nomeCompleto);
            var numPalavras = tokens.length;
            if (numPalavras === 1) {
                tmp2 = this.truncarPalavra(/* get */ tokens[0]);
            }
            else if (numPalavras === 2) {
                tmp1 = this.truncarPalavra(/* get */ tokens[0]);
                tmp2 = this.truncarPalavra(/* get */ tokens[1]);
            }
            else {
                var contPrenome = 0;
                for (var index2865 = 0; index2865 < tokens.length; index2865++) {
                    var palavra = tokens[index2865];
                    {
                        if (contPrenome < ind) {
                            /* add */ (palavrasPrenome.push(palavra) > 0);
                        }
                        else {
                            /* add */ (palavrasSobrenome.push(palavra) > 0);
                        }
                        contPrenome++;
                    }
                }
                tmp1 = this.concatenarPalavras(palavrasPrenome, NomeIcao.SEPARADOR);
                tmp2 = this.concatenarPalavras(palavrasSobrenome, NomeIcao.SEPARADOR);
                tmp1 = this.removerPreposicoes(tmp1, true);
                tmp1 = this.truncarIniciais(tmp1, 1);
                tmp2 = this.removerPreposicoes(tmp2, false);
                tmp2 = this.truncarIniciais(tmp2, 2);
            }
            this.nome = tmp1.trim();
            this.sobrenome = tmp2.trim();
        }
    };
    /**
     * Monta identificadores (primario/secundario) a partir do nome do
     * requerente de solicita????o de passaporte
     *
     * @param nomeCompleto
     * O nome do requerente da solicita????o
     * @return {void} Array com identificadores primario e secundario
     * @private
     */
    /*private*/ NomeIcao.prototype.gerarIdentificadores = function () {
        this.identificadorPrimario = this.substituirCaracteresAcentuados(this.sobrenome);
        this.identificadorSecundario = this.substituirCaracteresAcentuados(this.nome);
        this.identificadorPrimario = this.removerCaracterer(this.identificadorPrimario, NomeIcao.CARACTERES_$LI$());
        this.identificadorSecundario = this.removerCaracterer(this.identificadorSecundario, NomeIcao.CARACTERES_$LI$());
        this.identificadorPrimario = NomeIcao.removeEspacosArredoresHifen(this.identificadorPrimario);
        this.identificadorSecundario = NomeIcao.removeEspacosArredoresHifen(this.identificadorSecundario);
        this.identificadorPrimario = this.identificadorPrimario.split('-').join('<');
        this.identificadorSecundario = this.identificadorSecundario.split('-').join('<');
        var tamanhoCadeia = this.identificadorPrimario.concat(this.identificadorSecundario).length;
        if (tamanhoCadeia > NomeIcao.TAM_MAX_CONCAT) {
            var diferenca = tamanhoCadeia - NomeIcao.TAM_MAX_CONCAT;
            this.identificadorSecundario = this.identificadorSecundario.substring(0, this.identificadorSecundario.length - diferenca);
        }
        this.identificadorPrimario = this.identificadorPrimario.trim();
        this.identificadorSecundario = this.identificadorSecundario.trim();
    };
    /*private*/ NomeIcao.removeEspacosArredoresHifen = function (identificador) {
        var identificadorSemEspacosNosArredoresDoHifen = "";
        var pedacos = identificador.split("-");
        if (pedacos != null && pedacos.length > 1) {
            for (var i = 0; i < pedacos.length; i++) {
                identificadorSemEspacosNosArredoresDoHifen += pedacos[i].trim();
                if (i < pedacos.length - 1) {
                    identificadorSemEspacosNosArredoresDoHifen += "-";
                }
            }
            ;
            return identificadorSemEspacosNosArredoresDoHifen;
        }
        else {
            return identificador;
        }
    };
    /**
     * Retorna a lista de palavras
     * @param {string} _nome
     * @return {string[]} lista com as palavras contidas no nome
     * @private
     */
    /*private*/ NomeIcao.prototype.getTokens = function (_nome) {
        var palavras = _nome.match(/\S+/g);
        return palavras;
    };
    /**
     * Verifica se os campos nome e sobrenome s??o v??lidos
     * @param {string} _nome
     * @return {boolean}
     */
    NomeIcao.prototype.validarNomeSobrenome = function (_nome) {
        var valido = true;
        var nomeSemCaracteresEspeciais = _nome.trim().replace(new RegExp("<", 'g'), "");
        var nomeSemEspacos = _nome.trim();
        if (!(function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(nomeSemEspacos, nomeSemCaracteresEspeciais)) {
            valido = false;
        }
        return valido;
    };
    /**
     * Retorna a quantidade de palavras contidas no nome
     * @param {string} nome
     * @return {number} quantidade de palavras
     */
    NomeIcao.prototype.getQntNomes = function (nome) {
        var qnt = 0;
        if (nome != null && nome.length > 0) {
            var tokens = this.getTokens(nome);
            qnt = tokens.length;
        }
        return qnt;
    };
    /**
     * Remove o caracter da string
     * @param {string} palavra
     * @param {Array} listaCaracter: lista de caracteres para remover da palavra
     * @return
     * @return {string}
     * @private
     */
    /*private*/ NomeIcao.prototype.removerCaracterer = function (palavra, listaCaracter) {
        var retorno = palavra;
        for (var i = 0; i < listaCaracter.length; i++) {
            var caracter = listaCaracter[i];
            retorno = retorno.split(caracter).join("");
        }
        ;
        return retorno;
    };
    /**
     * Altera a distribui????o dos componentes do nome completo entre prenome e sobrenome nos casos de nome composto
     * @param {boolean} aumentarPrenome
     */
    NomeIcao.prototype.alterarDistribuicaoNomeComposto = function (aumentarPrenome) {
        this.tamanhoPrenome += aumentarPrenome ? 1 : -1;
        if (this.tamanhoPrenome > 0) {
            this.gerarNomeSobrenome(this.tamanhoPrenome);
            this.gerarIdentificadores();
        }
    };
    /**
     * Reduzir tamanho do nome do genitor para 60 caracteres
     * @param nomeGenitor
     * @return {string}
     */
    NomeIcao.prototype.reduzirNomeGenitor = function () {
        var nomeReduzido = this.removerPreposicoesGenitor(this.nomeCompleto, true);
        if (nomeReduzido.length > 60) {
            nomeReduzido = this.truncarIniciaisGenitor(nomeReduzido, 2);
        }
        return nomeReduzido;
    };
    /**
     * Reduzir a segunda parte do nome do genitor para contemplar 30 caracteres
     * @param nomeGenitor
     * @param {string} segundaParteNome
     * @return {string}
     */
    NomeIcao.prototype.reduzirSegundaParteNomeGenitor = function (segundaParteNome) {
        var nomeReduzido = this.truncarIniciais(segundaParteNome, 2);
        return nomeReduzido;
    };
    /**
     * Retorna verdadeiro houver mais de uma palavra que n??o seja preposi????o no sobrenome
     * @param cadeia
     * @return
     * @return {boolean}
     */
    NomeIcao.prototype.podeAumentarPrenome = function () {
        var palavras = this.getTokens(this.nomeCompleto);
        return palavras.length - this.tamanhoPrenome > 1;
    };
    /**
     * Retorna verdadeiro houver mais de uma palavra que n??o seja preposi????o no prenome
     * @param cadeia
     * @return
     * @return {boolean}
     */
    NomeIcao.prototype.podeAumentarSobrenome = function () {
        return this.tamanhoPrenome > 1;
    };
    /*private*/ NomeIcao.prototype.concatenarPalavras = function (palavras, separador) {
    	var palavraConcatenada = "";
    	for (var i = 0; i < palavras.length; i++) {
    		palavraConcatenada += palavras[i] + separador;
    	}
        return palavraConcatenada;
    };
    /*private*/ NomeIcao.prototype.substituirCaracteresAcentuados = function (arg0) {
        return arg0;
    };
    return NomeIcao;
}());
NomeIcao.TAM_MAX_UNICO_ID = 30;
NomeIcao.TAM_MAX_CONCAT = 37;
NomeIcao.SEPARADOR = " ";
NomeIcao["__class"] = "NomeIcao";
NomeIcao.CARACTERES_$LI$();
NomeIcao.SOBRENOMES_ESPECIAIS_$LI$();
NomeIcao.PREPOSICOES_COMPOSTAS_$LI$();
NomeIcao.PREPOSICOES_$LI$();
