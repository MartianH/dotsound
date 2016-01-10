//Play Button
// H. Martial 
navigator.sayswho = (function(){
    var ua=  navigator.userAgent, 
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    M = M[2]? [M[1]]: [navigator.appName, navigator.appVersion, '-?'];

    return M.join(' ');
})();

document.onkeypress = function() {checkKey(event)};

function checkKey(e){
	e.which = e.which || e.keyCode;
	if (e.which == 32) {
		startStream();
	}
	//else{
	//	alert("it works");
	//}
}

//onclick function
function startStream(){
	var sound = document.getElementById("stream");
			
	if (document.getElementById("status").innerHTML != "▶"){
			sound.pause();
			document.getElementById("status").innerHTML = "▶";
	}
	else
	{
		sound.play();
		document.getElementById("status").innerHTML = "❚❚";
	}
	if (sound.readyState == 0){
		document.getElementById("status").style.color = "#D14719";
		document.getElementById("status").innerHTML = "Off air";
	}
}

//onload function
function soundState(){
	var sound = document.getElementById("stream");
	if (sound.readyState == 0){
		document.getElementById("status").style.color = "#D14719";
		document.getElementById("status").innerHTML = "Off air";
	}
	else{
		document.getElementById("status").innerHTML = "▶";
		document.getElementById("status").style.color = "#FFF";
	}
	if (navigator.sayswho != "Chrome" && navigator.sayswho != "Firefox" && navigator.sayswho != "Opera"){
		document.getElementById("browser").style.color = "#D14719";
		document.getElementById("browser").innerHTML = navigator.sayswho + " doesn't support OGG audio files. Try <a href='https://www.google.com/chrome/browser/desktop/index.html' target='_blank'>Chrome</a> instead.";
	}
}
