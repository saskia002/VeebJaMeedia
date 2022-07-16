let cinema;
let titleMode = "hidden"; //disabled  hidden  showing
let titleNum = 0;

window.onload = function(){
	cinema = document.querySelector("#cinema");
	initiateSubtitles();
	}

function initiateSubtitles(){
	cinema.textTracks[titleNum].mode = titleMode;
	console.log(cinema.textTracks);
	document.querySelector("#subtitleBtn").addEventListener("click", setSubtitle);
	document.querySelector("#brightnessBtn").addEventListener("input", setFilter);
	document.querySelector("#contrastBtn").addEventListener("input", setFilter);
	document.querySelector("#saturationBtn").addEventListener("input", setFilter);
	document.querySelector("#blurBtn").addEventListener("input", setFilter);
}

function setSubtitle(){
	if(cinema.textTracks[titleNum].mode != "showing"){
		titleMode = "showing";
		cinema.textTracks[titleNum].mode = titleMode;
	} else {
		cinema.textTracks[titleNum].removeEventListener("cuechange", displaySubtitles);
		cinema.textTracks[titleNum].mode = "hidden";
		titleNum ++;
		if(titleNum >= cinema.textTracks.length){
			titleNum = 0;
		}
		cinema.textTracks[titleNum].mode = titleMode;
	}
	cinema.textTracks[titleNum].addEventListener("cuechange", displaySubtitles);
	displaySubtitles();
}

function displaySubtitles(){
	let newsubTitle = "";
	if(cinema.textTracks[titleNum].activeCues.length > 0){
		for(let i = 0; i < cinema.textTracks[titleNum].activeCues.length; i ++){
			newsubTitle += cinema.textTracks[titleNum].activeCues[i].id + ": " + cinema.textTracks[titleNum].activeCues[i].text + "<br>";
		}
	}
	document.querySelector("#subtitlePlace").innerHTML = newsubTitle;
}

function setFilter(){
	let filter = "";
	filter += "brightness(" + document.querySelector("#brightnessBtn").value + "%)";
	filter += " contrast(" + document.querySelector("#contrastBtn").value + "%)";
	filter += " saturate(" + document.querySelector("#saturationBtn").value + "%)";
	filter += " blur(" + document.querySelector("#blurBtn").value + "px)";
	cinema.style.filter = filter;
	console.log(filter);
}