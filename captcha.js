//Concatena o captcha com a senha.
function concatenarSenhaCaptcha() {
	var senha = document.getElementById("txt_password").value;
	senha += "," + document.getElementById("txt_captcha").value;
	document.getElementById("j_password").value = senha;
}

function html5_audio() {
	var a = document.createElement('audio');
	return !!(a.canPlayType && a.canPlayType('audio/wav;').replace(/no/, ''));
}

var play_html5_audio = false;

if (html5_audio())
	play_html5_audio = true;

function play_sound(url) {
	if (play_html5_audio) {
		var snd = new Audio(url);
		snd.load();
		snd.play();
	} else {
		try {
			//if (isInternetExplorer()) {
				//document.all.captchaAudioBgSound.src = url;
			//} else {
				var soundEmbed = document.createElement("embed");
				soundEmbed.setAttribute("src", url);
				soundEmbed.setAttribute("type", "audio/wav");
				soundEmbed.setAttribute("hidden", true);
				soundEmbed.setAttribute("autostart", true);
				document.body.appendChild(soundEmbed);
				//document.getElementById("captchaAudioSpan").innerHTML="<embed src='"+url+"' type='audio/wav' hidden=true autostart=true loop=false />";
			//}
		} catch (e) {
			//document.getElementById("frmBodyContent:form1:captchaLine:captchaGroup:captchaAudio").setAttribute("href", url);
		}
	}
}

function isInternetExplorer() {
   var ua = window.navigator.userAgent;
   var msie = ua.indexOf ( "MSIE " );
   return msie > 0;
}


 function recarregarImagem(form) {
	  setDispatch('reloadImage', 'false', $('#dispatch')[0], $('#validate')[0]);
	  $(form).submit();
	}