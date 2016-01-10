$(document).ready(function(){

    var audio = document.createElement('audio');
    audio.setAttribute("type", "audio/mpeg");
    var links = $('#test a');
    var artistID = $('#set-artist, #set-artist2');
    var titleID = $('#set-title, #set-title2');
    var isDisplayed = false;
    var randIndex = Math.floor(Math.random()* $('#test tr').length)-1;
    var initP = false;

    audio.onended = function(){
        console.log("current song ended");
        var newRandIndex = Math.floor(Math.random()* $('#test tr').length)-1;
        var tr = $('#test tr')[newRandIndex+1];
        var setArtist = $(tr).children(".artist").html();
        var setTitle = $(tr).children(".title").html();
        artistID.html(setArtist);
        titleID.html(setTitle);
        audio.src = links[newRandIndex].getAttribute("href");
        audio.play();
    };

    $('.controls').html("▶").click(function(){
        if(audio.currentTime == 0){
          startPlay();
          initP = true;
        }
        else{
          playState();
          console.log("buttton clicked");
        }

    });
    $(document).keydown(function(e){
        if(e.which == 32 ){
        if(initP == false){
          initP = true;
          startPlay();
          return false;
        }
            else if(initP == true){
          playState();
          return false;
        }

        }
    });

    function startPlay(){
      var tr = $('#test tr')[randIndex+1];
      var setArtist = $(tr).children(".artist").html();
      var setTitle = $(tr).children(".title").html();
      artistID.html(setArtist);
      titleID.html(setTitle);

      audio.src = links[randIndex].getAttribute("href");
      $('.controls').html("❚❚");
      audio.play();
      console.log("play initiated");
    }
    function playState(){
        if($('.controls').html() == "▶"){
            if(audio.currentTime != 0){
                $('#set-artist2').html();
                $('#set-title2').html();
                audio.play();
                $('.controls').html("❚❚");
            }
        }
        else if($('.controls').html() == "❚❚"){
            audio.pause();
            $('.controls').html("▶");

        }

    }

    $('.re').click(function(){
        if(isDisplayed == false){
            $('.re').html("Hide tracks");
            $('#test').show(1000);
            console.log("display tracks");
            isDisplayed = true;
        }
        else if(isDisplayed == true){
            $('.re').html("Show tracks");
            $('#test').fadeOut(700);
            console.log("hide tracks");
            isDisplayed = false;
        }
    });

    $('#test tr').click(function(){
        initP = true;
        $('.controls').html("❚❚");
        var tr = $(this)[0], trRowIndex = tr.rowIndex;
        //var links = document.getElementsByTagName("a");
        var setArtist = $(this).children(".artist").html();
        var setTitle = $(this).children(".title").html();

          audio.src = links[trRowIndex-1].getAttribute("href");
        //alert(trRowIndex);

        console.log($(this));
        console.log(trRowIndex);
            console.log($(this).innerText);
            console.log(audio.src);

            $('#set-artist, #set-title, #set-artist2, #set-title2').hide().fadeIn("slow");

            artistID.html(setArtist);
            titleID.html(setTitle);

            $('table tr').css("background-color", "transparent").css("color", "white");
            $(this).css("background-color", "#FFA319").css("color", "black");

            audio.play();


    });
    // Player ends here...




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


});