let musicURL = "http://greeny.cs.tlu.ee/~rinde/media/sounds/Funkytown.mp3";
let music = new Audio();

window.onload = function() {
	prepareAudio();
}

function prepareAudio(){
	music.addEventListener("canplay", showInfo);
	music.addEventListener("canplaythrough", canPlay);
	music.addEventListener("durationchange", showInfo);
	music.src = musicURL;
}

function showInfo(e){
	// console.log(e);
	if(e.type == "durationchange"){
		music.addEventListener("timeupdate", showInfo);
		// document.querySelector('#musicMeter').max = e.target.duration;
		// document.querySelector('#musicProgress').max = e.target.duration;
		document.querySelector('#musicSlider').max = e.target.duration;
		//document.querySelector('#musicSlider').addEventListener("change", musicSeek);
		document.querySelector('#musicSlider').addEventListener("input", musicSeek);
		//document.querySelector("#volBtn").addEventListener("input", setVol);
	}
	if(e.type  == "timeupdate"){
		document.querySelector('#musicPos').innerHTML = e.target.currentTime.toFixed(2);
		// document.querySelector('#musicMeter').value = e.target.currentTime;
		// document.querySelector('#musicProgress').value = e.target.currentTime;
		document.querySelector('#musicSlider').value = e.target.currentTime;
	}
}

function canPlay(){
	music.removeEventListener("canplaythrough", canPlay);
	document.querySelector('#musicBtn').innerHTML = "Mängi muusikat";
	document.querySelector('#musicBtn').addEventListener("click", toggleMusicPlay);
	document.querySelector("#volBtn").addEventListener("input", setVol);
	document.querySelector("#speedBtn").addEventListener("input", setSpeed);
}

//let isMusicPlaying = false;
function toggleMusicPlay(){
	if(music.paused){
		music.volume = document.querySelector("#volBtn").value;
		music.play();
		document.querySelector('#musicBtn').innerHTML = "Peata muusika";
		//music.addEventListener("timeupdate", showInfo)
	}else{
		music.pause();
		//music.removeEventListener("timeupdate", showInfo)
		document.querySelector('#musicBtn').innerHTML = "Mängi muusikat";
	}
}

function musicSeek(e){
	music.currentTime = e.target.value;
}

function setVol(e){
	music.volume = e.target.value;
}

function setSpeed(e){
	music.playbackRate = e.target.value;
}
