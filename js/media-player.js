window.onload = function(){

  videoPlayer.addEventListener('progress', buffered, false);

  $(window).resize(checkSize);
};

// Declare globar variables

var videoPlayer = document.getElementById("video_sample");
var play_pause_btn = document.getElementById("play_pause");
var video_fullscreen = document.getElementById("fullscreen");
var progress_bar = document.getElementById("progress-bar");
var current_time = document.getElementById("current-time");
var duration_time = document.getElementById("duration-time");
var vol_btn = document.getElementById("vol-btn");
var progress_container = document.getElementById("container-bar");
var media_controls = document.getElementById("media-controls");
var caption_btn = document.getElementById("cc-btn");
var speed_btn = document.getElementById("speed-btn");
var volumeControl = document.getElementById("volume");
var volumeDisplay = document.getElementById("volume_display");

// Add Classes on inti

play_pause_btn.classList.add("play-btn");
vol_btn.classList.add("vol-plus");

// Hide controls on video

videoPlayer.controls = false;

videoPlayer.addEventListener("click", play_pause, false);
play_pause_btn.addEventListener("click", play_pause, false);
videoPlayer.addEventListener("timeupdate", updateValues, false);
videoPlayer.addEventListener("ended", pauseOnEnded, false);
vol_btn.addEventListener("click", volMute, false);
video_fullscreen.addEventListener("click", videoFullscreen, false);
progress_container.addEventListener("click", clickedBar, false);
caption_btn.addEventListener("click", caption, false);
speed_btn.addEventListener("click", forwardFunction, false);

volumeControl.addEventListener("mousedown", function(){
  	document.onmousemove = function(e) {
    	setVolume(e.pageX);
  	};
  	document.onmouseup = function() {
    	document.onmousemove = null;
    	document.onmouseup = null;
  	};
}, true);
 
volumeControl.addEventListener("mouseup", function(e){
	setVolume(e.pageX);
},true);

var textTracks = videoPlayer.textTracks;
var textTrack = textTracks[0];
textTrack.mode = "disabled";

caption_btn.classList.add("disable-cc-btn");




function hideControls() {
	media_controls.style.display = 'none';

}

function showControls() {
	media_controls.style.display = 'block';
}


// keycode functions

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 13:
			if (
				video_fullscreen.fullscreenElement ||
				video_fullscreen.webkitFullscreenElement ||
				video_fullscreen.mozFullScreenElement ||
				video_fullscreen.msFullscreenElement
			) {
				if (video_fullscreen.exitFullscreen) {
					video_fullscreen.exitFullscreen();
				} else if (video_fullscreen.webkitExitFullscreen) {
					video_fullscreen.webkitExitFullscreen();
				} else if (video_fullscreen.mozCancelFullScreen) {
					video_fullscreen.mozCancelFullScreen();
				} else if (video_fullscreen.msExitFullscreen) {
					video_fullscreen.msExitFullscreen();
				}
			}
            break;
        case 32:
            play_pause();
            break;
    }
};

function caption() {
	if(textTrack.mode == "showing") {
		textTrack.mode = "disabled";
		caption_btn.classList.remove("enable-cc-btn");
		caption_btn.classList.add("disable-cc-btn");

	} else {
		textTrack.mode = "showing";
		caption_btn.classList.remove("disable-cc-btn");
		caption_btn.classList.add("enable-cc-btn");
	}
}

function volMute() {

	if(!videoPlayer.paused && !videoPlayer.ended) {
		console.log(videoPlayer.ended);
		if(videoPlayer.muted) {
			videoPlayer.muted = false;

			vol_btn.classList.add("vol-plus");
			vol_btn.classList.remove("vol-minus");
			console.log("unmute");
		}
		else {
			videoPlayer.muted = true;

			vol_btn.classList.add("vol-minus");
			vol_btn.classList.remove("vol-plus");		

			console.log("mute");
		}
	}

}

function setVolume(clickX) {
	var newVol = (clickX - findPosX(volumeControl)) / volumeControl.offsetWidth;
  	if (newVol > 1) {
    	newVol = 1;
  	} else if (newVol < 0) {
    	newVol = 0;
  	}
  	videoPlayer.volume = newVol;
  	updateVolumeDisplay();
}

function updateVolumeDisplay(){
	var volNum = Math.floor(videoPlayer.volume * 6);
  	for(var i=0; i<6; i++) {
    	if (i < volNum) {
      		volumeDisplay.children[i].style.borderColor = "#fff";
    	} else {
      	volumeDisplay.children[i].style.borderColor = "#555";
    	}
  	}
}

function forwardFunction() {

	if(!videoPlayer.paused && !videoPlayer.ended) {	
		if(videoPlayer.playbackRate == 1) {
			videoPlayer.playbackRate = 2;
		} else {
			videoPlayer.playbackRate = 1;
		}
	}
}

function videoFullscreen() {

	if(videoPlayer.requestFullScreen){
		videoPlayer.requestFullScreen();
	} else if(videoPlayer.webkitRequestFullScreen){
		videoPlayer.webkitRequestFullScreen();
	} else if(videoPlayer.mozRequestFullScreen){
		videoPlayer.mozRequestFullScreen();
	}
}

function pauseOnEnded() {
	videoPlayer.pause();
	play_pause_btn.classList.add("play-btn");
	play_pause_btn.classList.remove("pause-btn");
}

function play_pause() {

	if(videoPlayer.paused || videoPlayer.ended) {
		videoPlayer.play();
		play_pause_btn.classList.add("pause-btn");
		play_pause_btn.classList.remove("play-btn");
	} else {
		videoPlayer.pause();
		play_pause_btn.classList.add("play-btn");
		play_pause_btn.classList.remove("pause-btn");
	}
}

// When the user clicks on any sentence in the transcript the video player jumps to the appropriate time in the video.

$(".caption-container p:nth-of-type(1) span:nth-of-type(1)").on("click", function() {
	videoPlayer.currentTime = 0.240;
});

$(".caption-container p:nth-of-type(1) span:nth-of-type(2)").on("click", function() {
	videoPlayer.currentTime = 4.130;
});

$(".caption-container p:nth-of-type(2) span:nth-of-type(1)").on("click", function() {
	videoPlayer.currentTime = 7.535;
});

$(".caption-container p:nth-of-type(2) span:nth-of-type(2)").on("click", function() {
	videoPlayer.currentTime = 11.270;
});

$(".caption-container p:nth-of-type(2) span:nth-of-type(3)").on("click", function() {
	videoPlayer.currentTime = 13.960;
});

$(".caption-container p:nth-of-type(3) span:nth-of-type(1)").on("click", function() {
	videoPlayer.currentTime = 17.940;
});

$(".caption-container p:nth-of-type(3) span:nth-of-type(2)").on("click", function() {
	videoPlayer.currentTime = 23.370;
});

$(".caption-container p:nth-of-type(3) span:nth-of-type(3)").on("click", function() {
	videoPlayer.currentTime = 26.880;
});

$(".caption-container p:nth-of-type(4) span:nth-of-type(1)").on("click", function() {
	videoPlayer.currentTime = 32.100;
});

$(".caption-container p:nth-of-type(4) span:nth-of-type(2)").on("click", function() {
	videoPlayer.currentTime = 34.730;
});

$(".caption-container p:nth-of-type(4) span:nth-of-type(3)").on("click", function() {
	videoPlayer.currentTime = 39.430;
});

$(".caption-container p:nth-of-type(5) span:nth-of-type(1)").on("click", function() {
	videoPlayer.currentTime = 42.350;
});

$(".caption-container p:nth-of-type(5) span:nth-of-type(2)").on("click", function() {
	videoPlayer.currentTime = 46.300;
});

$(".caption-container p:nth-of-type(5) span:nth-of-type(3)").on("click", function() {
	videoPlayer.currentTime = 49.270;
});

$(".caption-container p:nth-of-type(6) span:nth-of-type(1)").on("click", function() {
	videoPlayer.currentTime = 53.760;
});

$(".caption-container p:nth-of-type(6) span:nth-of-type(2)").on("click", function() {
	videoPlayer.currentTime = 57.780;
});


function highlightCaption() {

	if(videoPlayer.currentTime >= 0.240 && videoPlayer.currentTime <= 4.130) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(1) span:nth-of-type(1)").addClass("highlight-caption");

	}
	if(videoPlayer.currentTime >= 4.130 && videoPlayer.currentTime <= 7.535) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(1) span:nth-of-type(2)").addClass("highlight-caption");
	}
	if(videoPlayer.currentTime >= 7.535 && videoPlayer.currentTime <= 11.270) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(2) span:nth-of-type(1)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 11.270 && videoPlayer.currentTime <= 13.960) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(2) span:nth-of-type(2)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 13.960 && videoPlayer.currentTime <= 17.940) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(2) span:nth-of-type(3)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 17.940 && videoPlayer.currentTime <= 22.370) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(3) span:nth-of-type(1)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 23.370 && videoPlayer.currentTime <= 26.880) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(3) span:nth-of-type(2)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 26.880 && videoPlayer.currentTime <= 30.920) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(3) span:nth-of-type(3)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 32.100 && videoPlayer.currentTime <= 34.730) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(4) span:nth-of-type(1)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 34.730 && videoPlayer.currentTime <= 39.430) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(4) span:nth-of-type(2)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 39.430 && videoPlayer.currentTime <= 41.190) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(4) span:nth-of-type(3)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 42.350 && videoPlayer.currentTime <= 46.300) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(5) span:nth-of-type(1)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 46.300 && videoPlayer.currentTime <= 49.270) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(5) span:nth-of-type(2)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 49.270 && videoPlayer.currentTime <= 53.760) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(5) span:nth-of-type(3)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 53.760 && videoPlayer.currentTime <= 57.780) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(6) span:nth-of-type(1)").addClass("highlight-caption");	
	}
	if(videoPlayer.currentTime >= 57.780 && videoPlayer.currentTime <= 59.150) {
		$(".caption-container p span").removeClass("highlight-caption");

		$(".caption-container p:nth-of-type(6) span:nth-of-type(2)").addClass("highlight-caption");	
	}
}

function updateValues() {

	if (!videoPlayer.ended || !videoPlayer.paused) {

		var porcentage = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
		progress_bar.value = porcentage;

		var curmins = Math.floor(videoPlayer.currentTime / 60);
		var cursec = Math.floor(videoPlayer.currentTime - curmins * 60);

		var durmins = Math.floor(videoPlayer.duration / 60);
		var dursec = Math.floor(videoPlayer.duration - durmins * 60);

		if(curmins < 10)
			curmins = "0" + curmins;
		if(cursec < 10)
			cursec = "0" + cursec;
		if(durmins < 10)
			durmins = "0" + durmins;
		if(dursec < 10)
			dursec = "0" + dursec;

		highlightCaption(videoPlayer.currentTime);
		checkSize();

		current_time.innerHTML = curmins + ":" + cursec;
		duration_time.innerHTML = durmins + ":" + dursec;

		progress_bar.innerHTML = porcentage + "% played";

	} else {
		progress_bar.value = 0;
		progress_bar.innerHTML = 0 + "%played";
		current_time.innerHTML = "00:00";
		duration_time.innerHTML = "00:00";

		$(".caption-container p span").removeClass("highlight-caption");
		$("#sixteenth-part").remove();
	}
}

function clickedBar(e) {

	var mouseX = Math.max(0, Math.min(1, (e.pageX - findPosX(progress_container)) / progress_container.offsetWidth));
	var newtime = mouseX * videoPlayer.duration;

	videoPlayer.currentTime = newtime;
	progress_bar.value = mouseX;
}

function findPosX(obj) {
	var curLeft = obj.offsetLeft;
	while(obj = obj.offsetParent) {
		curLeft += obj.offsetLeft;
	}

	return curLeft;
}

function buffered() {

	var bufferedEnd = videoPlayer.buffered.end(videoPlayer.buffered.length - 1);
    var duration =  videoPlayer.duration;
    if (duration > 0) {
      document.getElementById('buffered-amount').style.width = ((bufferedEnd / duration)*100) + "%";
    }
}

function checkSize(){
    var mediaquery = window.matchMedia("(max-width: 768px)");
    if (mediaquery.matches) {
    	if(videoPlayer.currentTime >= 0.240 && videoPlayer.currentTime <= 4.130){
    		$(".mobile-caption").remove();
    		if($("#one-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='one-part'>Now that we've looked at the architecture of the internet, let's see how you might</span>");
    		}
    	}
    	if(videoPlayer.currentTime >= 4.130 && videoPlayer.currentTime <= 7.535) {
    		$(".mobile-caption").remove();
    		if($("#second-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='second-part'>connect your personal devices to the internet inside your house.</span>");
    		}
    	}
		if(videoPlayer.currentTime >= 7.535 && videoPlayer.currentTime <= 11.270) {
			$(".mobile-caption").remove();
			if($("#third-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='third-part'>Well there are many ways to connect to the internet, and</span>");
    		}
		}
		if(videoPlayer.currentTime >= 11.270 && videoPlayer.currentTime <= 13.960) {
			$(".mobile-caption").remove();
			if($("#forth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='forth-part'>most often people connect wirelessly.</span>");
    		}
		}
		if(videoPlayer.currentTime >= 13.960 && videoPlayer.currentTime <= 17.940) {
			$(".mobile-caption").remove();
			if($("#fifth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='fifth-part'>Let's look at an example of how you can connect to the internet.</span>");
    		}
		}
		if(videoPlayer.currentTime >= 17.940 && videoPlayer.currentTime <= 22.370) {
			$(".mobile-caption").remove();
			if($("#sixth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='sixth-part'>If you live in a city or a town, you probably have a coaxial cable for</span>");
    		}
		}
		if(videoPlayer.currentTime >= 23.370 && videoPlayer.currentTime <= 26.880) {
			$(".mobile-caption").remove();
			if($("#seventh-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='seventh-part'>cable Internet, or a phone line if you have DSL, running to the outside of</span>");
    		}
		}
		if(videoPlayer.currentTime >= 26.880 && videoPlayer.currentTime <= 30.920) {
			$(".mobile-caption").remove();
			if($("#eigth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='eigth-part'>your house, that connects you to the Internet Service Provider, or ISP.</span>");
    		}
		}
		if(videoPlayer.currentTime >= 32.100 && videoPlayer.currentTime <= 34.730) {
			$(".mobile-caption").remove();
			if($("#nineth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='nineth-part'>If you live far out in the country, you'll more likely have</span>");
    		}
		}
		if(videoPlayer.currentTime >= 34.730 && videoPlayer.currentTime <= 39.430) {
			$(".mobile-caption").remove();
			if($("#tenth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='tenth-part'>a dish outside your house, connecting you wirelessly to your closest ISP, or</span>");
    		}
		}
		if(videoPlayer.currentTime >= 39.430 && videoPlayer.currentTime <= 41.190) {
			$(".mobile-caption").remove();
			if($("#eleventh-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='eleventh-part'>you might also use the telephone system.<span>");
    		}
		}
		if(videoPlayer.currentTime >= 42.350 && videoPlayer.currentTime <= 46.300) {
			$(".mobile-caption").remove();
			if($("#twelth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='twelth-part'>Whether a wire comes straight from the ISP hookup outside your house, or<span>");
    		}
		}
		if(videoPlayer.currentTime >= 46.300 && videoPlayer.currentTime <= 49.270) {
			$(".mobile-caption").remove();
			if($("#thirteenth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='thirteenth-part'>it travels over radio waves from your roof,<span>");
    		}
		}
		if(videoPlayer.currentTime >= 49.270 && videoPlayer.currentTime <= 53.760) {
			$(".mobile-caption").remove();
			if($("#fourteenth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='fourteenth-part'>the first stop a wire will make once inside your house, is at your modem.<span>");
    		}
		}
		if(videoPlayer.currentTime >= 53.760 && videoPlayer.currentTime <= 57.780) {
			$(".mobile-caption").remove();
			if($("#fifteenth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='fifteenth-part'>A modem is what connects the internet to your network at home.<span>");
    		}
		}
		if(videoPlayer.currentTime >= 57.780 && videoPlayer.currentTime <= 59.150) {
			$(".mobile-caption").remove();
			if($("#sixteenth-part").length === 0){
    			$("#caption-container-mobile").append("<span class='mobile-caption' id='sixteenth-part'>A few common residential modems are DSL or<span>");
    		}
		}
	} 

}