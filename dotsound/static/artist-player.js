var audio = document.createElement('audio');
audio.setAttribute("type", "audio/mpeg");

//artist starts here
$(document).ready(function(){

	$('.artist_play').html("▶").click(function(){
	  var playIndex = $('.artist_play').index(this)
	  audio.src = $('section a')[playIndex].getAttribute("href");
	  audio.play();
	  console.log('Audio Source changed to: ');
	  console.log($('section a')[playIndex].getAttribute("href"));
	});

});


// Paul Irish requestAnimationFrame Polyfill
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 2000 / 300);
          };
})();



var audioVisual = document.getElementById('audio-visual');
console.log(wrap);
// canvas stuff
var canvas = document.getElementById('c');
canvas_context = canvas.getContext('2d');

var canvas = document.getElementById('c');
  // get width window
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight|| e.clientHeight|| g.clientHeight;
  // set width canvas
    canvas.setAttribute('width', width-(width*0.145) );
  // get canvas context --> zoek de context, hier wordt in getekend
    canvasContext = canvas.getContext('2d');

// audio stuff
var audioSrc = audio.src;

audio.id = 'a';
audioVisual.appendChild(audio);

// analyser stuff
var context = new AudioContext()||new webkitAudioContext();
var analyser = context.createAnalyser();
analyser.fftSize = 2048;
 
// connect the stuff up to eachother
var source = context.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(context.destination);
freqAnalyser();
 
 
// draw the analyser to the canvas
function freqAnalyser() {
 window.requestAnimFrame(freqAnalyser);
  var sum;
  var average;
  var bar_width;
  var scaled_average;
	var num_bars = 300;
  var data = new Uint8Array(2048);
  analyser.getByteFrequencyData(data);
  
  // clear canvas
  canvas_context.clearRect(0, 0, canvas.width, canvas.height);
  var bin_size = Math.floor(data.length / num_bars);
  for (var i = 0; i < num_bars; i += 1) {
    sum = 0;
    for (var j = 0; j < bin_size; j += 1) {
      sum += data[(i * bin_size) + j];
    }
  	average = sum / bin_size;
  	bar_width = num_bars/30;
  	scaled_average = (average / 256) * canvas.height;
  	canvas_context.fillRect(i * bar_width, canvas.height, bar_width - 2, - scaled_average);
	}
}

// ----------------------- EVENTS
  
window.onresize = function(event) {
      var canvas = document.getElementById('c');
  // get width window
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        width = w.innerWidth || e.clientWidth || g.clientWidth,
        height = w.innerHeight|| e.clientHeight|| g.clientHeight;
  // set width canvas
    canvas.setAttribute('width', width-(width*0.05) );
};
