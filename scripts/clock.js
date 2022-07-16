let chime = new Audio();
let chimeCount = 0;
let hourBefore;
let clockAudio = new Audio();
let timeWords = [];
let clockAudioURL = "https://greeny.cs.tlu.ee/~rinde/media/sounds/kellaheli/";

window.onload = function (){
	putDate();
	clockWork();
	//window.setInterval(clockWork, 100);
	// let myTimer = setInterval(clockWork, 100);
	// clearInterval(myTimer);
	chime.src = "http://greeny.cs.tlu.ee/~rinde/media/sounds/kellaheli/kell.mp3";
	//chime.play();
	//document.querySelector('#canChime').addEventListener('click', chimeOnce)
	
	hourBefore = new Date().getHours();
	
	document.querySelector("#timeBtn").addEventListener("click", tellTime)
};

function chimeOnce(){
	chime.play();
}

function putDate(){
	let timeNow = new Date();
	let monthNameET = [
		"jaanuar",
		"veebruar",
		"märts",
		"aprill",
		"mai",
		"juuni",
		"juuli",
		"august",
		"september",
		"oktoober",
		"november",
		"detsember",
	];
	let dayNameEST = [
		"Pühapäev",
		"Esmaspäev",
		"Teisipäev",
		"Kolmapäev",
		"Neljapäev",
		"Reede",
		"Laupäev",
	];

	document.querySelector("#datePlace").innerHTML =
		timeNow.getDate() +
		"." +
		monthNameET[timeNow.getMonth()] +
		"." +
		timeNow.getFullYear();
}

function clockWork() {
	let timeNow = new Date();
	document.querySelector("#secondhand").style.transform =
		"rotate(" + timeNow.getSeconds() * 6 + "deg)";
	document.querySelector("#minutehand").style.transform =
		"rotate(" +
		(timeNow.getMinutes() * 6 + timeNow.getSeconds() * 0.1) +
		"deg)";
	document.querySelector("#hourhand").style.transform =
		"rotate(" + (timeNow.getHours() * 30 + timeNow.getMinutes() * 0.5) + "deg)";
	//console.log(timeNow.getHours());

	//sama mis setInterval aga sellega saab mingi fnc käima panna
	//setTimeout(clockWork, 500);

	//sama mis setInterval aga kasutab vähem mälu..
	//setTimeout uuem versioon. 1/60 sekundit on käivitamise aeg.
	requestAnimationFrame(clockWork);
	
	//kas lüüa kella
	//if(timeNow.getMinutes() == 0 && timeNow.getSeconds() == 0 && timeNow.getMilliseconds() < 1000/60){
	if(hourBefore != timeNow.getHours()){
		if(document.querySelector('#canChime').checked){
			chimeCount = timeNow.getHours() % 12 || 12;
			
			chime.addEventListener('ended', doChime);
			doChime();
		}
		hourBefore = timeNow.getHours();
	}
}

function doChime(){
	if(chimeCount > 0){
		chime.play();
		chimeCount--;
	}else{
		chime.removeEventListener('ended', doChime);
	}
}

function tellTime(){
	document.querySelector('#timeBtn').disabled = true;
	
	timeWords.push("kellon");
	let timeNow = new Date();
	numToWords(timeNow.getHours());
	timeWords.push("ja");
	numToWords(timeNow.getMinutes());
	
	if(timeNow.getMinutes() == 1){
		timeWords.push("minut");
	}else{
		timeWords.push("minutit");
	}
	
	clockAudio.addEventListener("ended", speakTime);
	speakTime();
}

function speakTime(){
	if(timeWords.length > 0){
		clockAudio.src = clockAudioURL + timeWords[0] + ".mp3";
		clockAudio.play();
		clockAudio.volume = 1;
		timeWords.shift();
	}else{
		clockAudio.removeEventListener("ended", speakTime);
		document.querySelector('#timeBtn').disabled = false;
	}
}

function numToWords(numValue){
	if(numValue <= 10){
		timeWords.push(numValue);
	}else{
		let tens = Math.floor(numValue / 10);
		let ones = numValue % 10;
		if(tens == 1){
			timeWords.push(ones);
			timeWords.push("teist");
		}else{
			timeWords.push(tens);
			timeWords.push("kymmend");
			if(ones > 0){
				timeWords.push(ones);
			}
		}
	}
	//console.log(timeWords);
}