/*************************************************
SCRIPTS COMUNS A VARIAS PAGINAS
**************************************************/

/**
 * Declaracao de constantes.
 */
var CODIGO_BRASIL = 3034;
var MAIORIDADE_CIVIL = 18;

$(function() {
	
	/**
	 * Aumentar/dimuir tamanho da fonte (require store.js e rv-query-fontsize.min.js)
	 */
	$.rvFontsize({
	    targetSection: '#corpo',
	    variations: 10,
	    controllers: {
	    	store: true,
	    	apend: false
	    }
	});
	
	testarContrasteHabilitado();
	
	/**
	 * Colocar letras das caixas de texto em maiusculo.
	 * Atencao: isso nao faz com que grave as informacoes com as letras maiusculas.
	 */
	$('input[type=text]').val(function() {
		return this.value.toUpperCase();
	});
	
	/**
	 * Mascaras para inputs (require jquery.mask.min.js).
	 */
	//Funcao para telefone aceitar numeros com oito ou nove digitos
	var noveDigitos = function(val) {
		return val.replace(/\D/g, '').length === 9 ? '00000-0000'
				: '0000-00009';
	}, noveDigitosOpcoes = {
		onKeyPress : function(val, e, field, options) {
			field.mask(noveDigitos.apply({}, arguments), options);
		}
	};
	
	$('.date').mask("00/00/0000", {placeholder: "__/__/____"});
	$('.cep').mask('00000-000', {placeholder: "_____-___"});
	$('.telefone').mask(noveDigitos, noveDigitosOpcoes);
	$('.titulo').mask('#00/00', {reverse: true, placeholder: "___________-__"});
	$('.cpf').mask('000.000.000-00', {reverse: true, placeholder: "___.___.___-__"});
	$('.protocolo').mask('0.0000.0000000000', {reverse: false, placeholder: "_.____.__________"});
	$('.passaporte').mask("AA000000", {'translation': {
        A: {pattern: /[A-Za-z]/}
	}
	});
		
	/**
	 * Esconde mensagem de erro se estiver em branco.
	 */
	if ($(".erro").length){
		if ($(".erro").html().trim() == "") {
			$(".erro").hide();
		} else {
			$(".erro").removeClass("hidden");
			$(".erro").show();
		}
	}
	
	if ($(".sucesso").length) {
		if ($(".sucesso").html().trim() == "") {
			$(".sucesso").hide();
		} else {
			$(".sucesso").removeClass("hidden");
			$(".sucesso").show();
		}
	}
	
	/**
	 * Todo campo que tem a classe obrigatorio, tera adicionada a propriedade Aria-required = true.
	 * Isso e devido a limitacao do JSF que nao reconhece essa propriedade.
	 */
	if($(".obrigatorio")){
		$(".obrigatorio").attr('aria-required', true);
	}
	
	$("#email2").hide();
	$("#pote2").append("<input type='text' id='url' name='url' aria-hidden='true' value='' alt='ignore este campo' tabindex='-1'/>");
	$("#pote2").append("<label for='url' class='hidden' aria-hidden='true'>Fim do teste anti-spam.</label>");
	
});



function aplicarAltoContraste(){
	constraste();
	if ($("#corpo").hasClass("contraste")) {
		store.set('guardarContraste', 'true');
	} else {
		store.set('guardarContraste', 'false');
	}
}

function testarContrasteHabilitado() {
	if (store.get('guardarContraste') == 'true') {
		constraste();
	}
}

function constraste() {
	$("body, body *").toggleClass('contraste');
	$(".navbar, .navbar *").removeClass('contraste');
	$(".nav, .nav *").removeClass('contraste');
	$(".row, .row>*").removeClass('contraste');
	$(".obrigatorio, .obrigatorio *").removeClass('contraste');
	$(".popover, .popover *").css('background-color', '#000');
	$(".popover, .popover *").css('color', '#FFF');
}

/**
 * Foco no campo especificado no data-focus de cada aba.
 */
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = $(e.target).attr('data-focus'); 
  $(target).focus();
});

/**
 * Limpar todos os campos do form (limitado aos objetos exibidos na tela)
 * Inicializa as caixas de selecao de pais com "BRASIL" (class="listaPaises").
 */
$('.limpar').click(function() {
	$(':input').not(':button, :submit, :reset, :hidden, .not-reset').removeAttr('checked').removeAttr('selected').not(':checkbox, :radio, .naoLimpar').val('');
	$('#nomeCompletoMontado, #nomeInformado, #sobrenomeInformado, #dataNascimentoInformado, ' +
		'#filiacao1Informado, #filiacao2Informado, #sexoInformado, #cpfInformado, #naturalidadeInformado, #nacionalidadeInformado').text('');
	$('.listaPaises').val(CODIGO_BRASIL).change();
	$(".erro").hide();
	$(':input').not(':button, :submit, :reset, :hidden, .not-reset').removeAttr('checked').removeClass("errocampo");
});

/**
 * Eliminar zeros.
 * @param s
 * @returns string sem os zeros
 */
function stripZeros(s){
	return s.replace(/^0+/, '');
}

function desabilita($campo) {
	$campo.prop("disabled", true);
	$campo.val("");
}

/**
 * Converte uma string para data.
 * @param $stringData
 * @returns {Date}
 */
function parseToDate($stringData) {
	var arrayData = $stringData.val().split("/");
	
	var dia = parseInt(stripZeros(arrayData[0]));
	var mes = parseInt(stripZeros(arrayData[1]));
	var ano = parseInt(stripZeros(arrayData[2]));
	var formatoData = new Date(ano, mes - 1, dia);
	
	return formatoData;
}

/**
 * Deixa o campo invisivel.
 * @param $campo
 */
function ocultarCampo($campo) {
	$campo.hide();
}

function validaHumano(){
	if ($("#email1").length){
		defaultEmail1 = $("#email1").prop('defaultValue');
		defaultEmail2 = $("#email2").prop('defaultValue');
		defaultUrl = $("#url").prop('defaultValue');
		valEmail1 = $("#email1").val();
		valEmail2 = $("#email2").val();
		valUrl = $("#url").val();
	
		if (defaultEmail1 == ""	&& defaultEmail2 == "" 	&& defaultUrl == ""){
			if (valEmail1 == "" && valEmail2 == "" && valUrl == ""){
				return true;
			}
		}	
	}
	return false;
}

/**
 * Validacao do CPF.
 * @param cpf
 * @returns {Boolean}
 */
function valida_cpf(cpf)  {
	var numeros, digitos, soma, i, resultado, digitos_iguais;
	digitos_iguais = 1;
	if (cpf.length < 11)
		return false;
	for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
			digitos_iguais = 0;
			break;
	}
	if (!digitos_iguais) {
    	numeros = cpf.substring(0,9);
		digitos = cpf.substring(9);
        soma = 0;
		for (i = 10; i > 1; i--)
			soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0))
        	return false;
		numeros = cpf.substring(0,10);
        soma = 0;
		for (i = 11; i > 1; i--)
			soma += numeros.charAt(11 - i) * i;
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	    if (resultado != digitos.charAt(1))
    		return false;
        return true;
	}
	else
		return false;
} 

/**
 * Verifica se a data possui a quantidade de caracteres minima e se e menor ou igual a data atual.
 * @param $data
 * @param label
 */
function validarData($data, label) {
	var dataConvertida = "";
	var dataAtual = new Date();
	
	if (!isCampoEmBranco($data) && $data.val().length < 10) {
		mensagem += "<li>- " + label + " invalida.</li>";
		destacarCampo($data);
	} else if (!isCampoEmBranco($data)){
		tirarDestaqueCampo($data);
		dataConvertida = parseToDate($data);
	}
	
	if (dataConvertida != "" && dataConvertida > dataAtual) {
		mensagem += "<li>- " + label + " posterior a data atual.</li>";
 		destacarCampo($data);
 	} else {
 		tirarDestaqueCampo($data);
 	}
}

/**
 * Validacao de email
 * @param $email
 * @returns {Boolean}
 */
function valida_email($email){
	var conteudoEmail = $email.val();
	var emailFilter=/^.+@.+\..{2,}$/;
	var illegalChars= /[\(\)\<\>\,\;\:\\\/\"\[\]]/;
	if(!(emailFilter.test(conteudoEmail))||conteudoEmail.match(illegalChars)){
		return false;
	}
	return true;
}

/**
 * Percorre todos os campos de texto do form e substitui html por texto limpo.
 * @param nomeForm
 */
function prevenirInjecao(nomeForm) {
	$("form#"+ nomeForm + " input[type=text]").each(function(){
		var campo = $(this);
		$(this).val(campo.val().replace(/</g, "").replace(/>/g, ""));
	});
}

/**
 * Testa se o campo esta em branco.
 * @param $campo
 * @returns {Boolean}
 */
function isCampoEmBranco($campo){
	return ($campo.val() == null || $campo.val().length == 0);
}


/**
 * Conta quantidade de palavras de um nome
 */
function contar($campo){
    var texto = $campo.val();
    if (isCampoEmBranco($campo)) {
    	return 0;
    } else {
    	return  texto.trim().split(' ').length;	
    }
    
}

/**
 * Coloca classe de destaque de erro quando campo nao esta preenchido
 * e retira se estiver.
 * @param $campo
 * @param labelCampo
 * @param tab (opcional, somente para os casos que a tela tem abas)
 */
function destacarCampoPreenchimentoObrigatorio($campo, labelCampo, tab) {
	if (typeof(tab) !="undefined") {
		destacarCampoSobDeterminadaCondicao(isCampoEmBranco($campo), $campo, labelCampo, tab);
	} else {
		destacarCampoSobDeterminadaCondicao(isCampoEmBranco($campo), $campo, labelCampo);
	}
}

/**
 * Coloca classe de destaque de erro quando uma condicao for satisfeita
 * e retira se nao estiver. So pode destacar um objeto por vez.
 * o campo precisa estar habilitado para ser exigido.
 * @param condicao
 * @param labelCampo
 * @param tab (opcional, somente para os casos que a tela tem abas)
 */
function destacarCampoSobDeterminadaCondicao(condicao, $campo, labelCampo, tab) {
	if (condicao && !$campo.attr("disabled")) {
		if (typeof(tab) !="undefined" && $tab == null) {
			$tab = tab;
		}

		if ($campo.attr("id") === "cpf") {
			mensagem += "<li>- O campo " + labelCampo + 
						" necessita ser preenchido para maiores e menores de 18 anos. Por favor, informar um CPF v\u00E1lido. <a href='#' tabindex='-1'";
		} else {
			mensagem += "<li>- O campo " + labelCampo + " necessita ser preenchido. <a href='#' tabindex='-1'";			
		} 

		if($tab != null){
			mensagem += " aba='" + $tab.selector;
		}
		mensagem += "' elemento='" + $campo.selector + "' class='sr-only' onclick='focaCampo(this)'>Ir para o campo " + labelCampo + "</a></li>";

		destacarCampo($campo);
	} else {
		tirarDestaqueCampo($campo);
	}	
}

/**
 * Foco no campo especificado e aba especificados no link.
 */
function focaCampo(e){
	if (e.attributes.aba){
		var tab = e.attributes.aba.nodeValue;
		$(tab).tab('show');
	}
	var element = e.attributes.elemento.nodeValue;
	$(element).focus();
}

/**
 * Adicionar classe de destaque ao campo.
 * @param $campo
 */
function destacarCampo($campo) {
	$campo.addClass("errocampo");
	$campo.attr('aria-invalid', true);
}

/**
 * Remover a classe de destaque do campo.
 * @param $campo
 */
function tirarDestaqueCampo($campo) {
	if ($campo.hasClass("errocampo")) {
		$campo.removeClass("errocampo");
		$campo.attr('aria-invalid', false);
	}
}

/**
 * Exibe mensagem de erro quando ha algo a ser informado ao usuario.
 * @param frase
 * @param mensagem
 * @returns {Boolean}
 */
function exibirMensagemErro(frase, mensagem) {
	if (mensagem != ""){
		conteudo = "<a href='#' name='mensagemErro' class='sr-only msgErro'>Mensagem de erro</a>" 
			+ "<h2>" + frase + "</h2><ul>" + mensagem + "</ul>";
		$(".erro").html(conteudo);
		$(".erro").show();
		$(".msgErro").focus();
		if ($(".erro").hasClass("hidden")) {
			$(".erro").removeClass("hidden");
		}
		return false;
	 }
	
	$(".erro").hide();
	return true;
}

/**
 * Exibe mensagem de erro local quando ha algo a ser informado ao usuario. 
 * Usar quando a mensagem for especifica como para o nome anterior ou nacionalidade.
 * @param frase
 * @param mensagem
 * @param $erro
 * @returns {Boolean}
 */
function exibirMensagemErroLocal(frase, mensagem, erro) {
	$erro = $("." + erro);
	if (mensagem != ""){
		conteudo = "<p>" + frase + "</p><p>" + mensagem + "</p>";
		$erro.html(conteudo);
		$erro.show();
		if ($erro.hasClass("hidden")) {
			$erro.removeClass("hidden");
		}
		return false;
	}
	
	$erro.hide();
	return true;
}

/**
 * Salta a navegacao para uma ancora (acessibilidade).
 * @param nomeancora
 */
function irParaAncora(nomeancora){
	var target_offset = $("#" + nomeancora).offset();
	var target_top = target_offset.top;
	$('html, body').animate({ scrollTop: target_top }, 0);
}

/**
 * Voltar para a pagina anterior.
 * @returns {Boolean}
 */
function voltar(){
    parent.history.back();
    return false;
}

/**
 * Redireciona para determinado metodo definido no struts.xml.
 * @param nome do metodo (string)
 */
function setDispatcher(method){
	$('#dispatcher').val(method);
}

/**
* Seta a validacao.
* @param validate
*/
function setValidate(validate){
	$("#validate").val(validate);
}

/**
 * Imprimir o conteudo da tela.
 */
function imprimirTela() {
	window.print();
}

/**
 * Imprimir PDF exibido na tela.
 * @param nomeFrame
 */
function imprimirPdf(nomeFrame) {
	zoomIframe(nomeFrame);
	frames[nomeFrame].focus();
	frames[nomeFrame].print();
}

function zoomIframe(nomeFrame){
	$frame = $(nomeFrame);
	if($.browser.msie) {
		$frame.contents().find("body").css({
			//IE 9
			'msTransform' : 'scale(1.15, 1.15)',
			//IE Legace
			'zoom' : '110%',
			//Ajuste de posicionamento
			'position' : 'absolute',
			'margin-left' : '-20px',
			'margin-top' : '-20px'
		});
	}
  else{
	  //da um 'zoom' na GRU para sair em um tamanho mais adequado para a impress�o.
	  $frame.contents().find("body").css({
		  //Mozilla
		  'MozTransform' : 'scale(1.15, 1.15)',
		  //Chrome
		  'WebkitTransform' : 'scale(1.15, 1.15)',
		  //Ajuste de posicionamento
		  'position' : 'absolute',
		  'left' : '3%',
		  'top' : '4%'
	  });
  }
}

/**
 * Fechar janela.
 */
function fecharJanela() {
	window.close();
}

/**
 * Tempo limite para a operacao atingido. 
 * @param xmlhttp
 */
function timeout(xmlhttp){
	xmlhttp.abort();
	alert("O servidor demorou demais a responder, tente novamente.");
}

/**
 * Ajax.
 * @param url
 * @param retorno
 * @param ontimeout
 * @param assincrono
 */
function ajax(url, retorno, ontimeout, assincrono){
	var  xmlhttp;
	
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
	  	xmlhttp=new XMLHttpRequest();
	}else{// code for IE6, IE5   <td style="width: 30%; padding-left: 4px;" align="left" valign="middle">N&uacute;mero de Protocolo:</td>
		
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	var fr = function (){
		ontimeout(xmlhttp);
	};

	 time = setTimeout(fr,10000);

	if(assincrono){
		xmlhttp.onreadystatechange = function(){
		  if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			    clearTimeout(time);
		    	retorno(xmlhttp);
		  }
		};
		
		xmlhttp.open("GET",url,assincrono);
		xmlhttp.send('');
	}else{
		xmlhttp.open("GET",url,assincrono);
		xmlhttp.send('');
		clearTimeout(time);
		retorno(xmlhttp);
	}
}

/************ SCRIPTS LEGADO ************/

/**
 * ASCII Espaco = 32 Parentese Esq ( = 40 Parentese Dir ) = 41 Hifen - = 45
 * Ponto . = 46 Barra / = 47 tab = 9 
 */

function getKey(event){
	keypressed = event.which || event.keyCode;
	return keypressed;
}

function somenteNumerosLetras(e) {
	key = getKey(e);
	
	if (key != 8 || key != 9 || key < 48 || ((key > 57) & (key < 65))
			|| ((key > 90) && (key < 97)) || key > 122) {
		return (((key > 47) && (key < 58)) || ((key > 64) & (key < 91))
				|| ((key > 96) & (key < 123)) || (key == 8) || (key == 9) || key == 199 || key == 231);
	} else {
		return true;
	}
}

function somenteNumeros(e) {
	key = getKey(e);

	if (key != 8 || key != 9 || key < 48 || key > 57) {
		return (((key > 47) && (key < 58)) || (key == 8) || (key == 9));
	} else {
		return true;
	}
}

function somenteLetras(e) {
	key = getKey(e);
	
	return (key >= 65 & key <= 90) || (key >= 97 && key <= 122) || key == 8 || key == 9
			|| key == 199 || key == 231;
}

function somenteLetrasEspaco(e) {
	key = getKey(e);
	
	return (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 8 || key == 9
			|| key == 32 || key == 180 || key == 193 || key == 194
			|| key == 195 || key == 199 || key == 231 || key == 201
			|| key == 202 || key == 205 || key == 206 || key == 211
			|| key == 212 || key == 213 || key == 218 || key == 219
			|| key == 220 || key == 225 || key == 226 || key == 227
			|| key == 233 || key == 234 || key == 237 || key == 238
			|| key == 241 || key == 243 || key == 244 || key == 245
			|| key == 250 || key == 251 || key == 252;
}

function somenteNomeICAO(e) {
	key = getKey(e);
	
				
			return (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 8 || key == 9
			|| (key >= 16 && key <= 18) ||key == 32 || key == 39
			|| key == 45 ||  key == 180 || (key >= 192 && key <= 195)
			|| key == 199 || key == 231 || key == 200 || key == 201 || key == 202
			|| key == 204 || key == 205 || key == 206 || key == 210
			|| key == 211 || key == 212 || key == 213 || key == 217
			|| key == 218 || key == 219 || key == 220 || key == 221
			|| key == 224 || key == 225 || key == 226 || key == 227
			|| key == 232 || key == 233 || key == 234 || key == 236
			|| key == 237 || key == 238 || key == 241 || key == 242
			|| key == 243 || key == 244 || key == 245 || key == 249
			|| key == 250 || key == 251 || key == 252 || key == 253;
			
			
}

function limparCaracteresCPF(cpf) {
	var cpfString = new String(cpf.value);
	
	cpfString = cpfString.replace(".", "");
	cpfString = cpfString.replace(".", "");
	cpfString = cpfString.replace("-", "");
	
	return cpfString;
}