let canvas;
let ctx;
let canvas2;
let ctx2;

window.onload = function(){
	canvas = document.querySelector("#canvas1");
	canvas.style.backgroundColor = "white";
	canvas.style.border = "1px solid black";
	ctx = canvas.getContext("2d");
	drawCenterline();
	drawTempGraph();
	
	canvas2 = document.querySelector("#canvas2");
	canvas2.style.backgroundColor = "white";
	canvas2.style.border = "1px solid black";
	ctx2 = canvas2.getContext("2d");
	drawRainGraph();
	
	//joonistamine...
	ctx2.imageSmoothingEnabled = true;
	ctx2.shadowBlur = 1
	ctx2.shadowColor = 'black'
	
	//canvas.addEventListener("mousedown", test);
	
	canvas2.addEventListener("mousedown", startDrawing);
	canvas2.addEventListener("mouseup", stopDrawing);
	canvas2.addEventListener("mouseout", stopDrawing);	
	
	//pildi alla laadimine
	document.querySelector("#saveBtn").addEventListener("click", savePicture);
}

function drawRainGraph(){
	let stepsX = (canvas2.width / avgRain.length).toFixed(1);
	let stepsY = (canvas2.height / 200).toFixed(1);
	
	let borderWidth = 1;
	let offset = borderWidth * 2;

	ctx2.strokeStyle = "#666666";
	ctx2.beginPath();
		for(let i = 1; i <= avgRain.length; i ++){
			ctx2.beginPath();
				//ctx2.rect(stepsX * i, -(avgRain[i-1][2] * stepsY) + canvas2.height,stepsX, ((avgRain[i-1][2] * stepsY) + canvas2.height)); //X, Y, laius, pikkus
				ctx2.fillStyle = "#666666";
				ctx2.fillRect(stepsX * i, -(avgRain[i-1][2] * stepsY) + canvas2.height,stepsX, ((avgRain[i-1][2] * stepsY) + canvas2.height)); //X, Y, laius, pikkus				
				ctx2.fill();
				
				
				//let alpha = "0." + String(avgRain[i-1][2]).slice(0, 2);
				//console.log(rangeCon(200, 0, 200, 0, 1))
				let alpha = (rangeCon(avgRain[i-1][2], 190, 0, 0, 1));
				ctx2.fillStyle = "rgba(255, 255, 255,"+ alpha +")";		
						
				ctx2.fillRect((stepsX * i) - borderWidth, (-(avgRain[i-1][2] * stepsY) + canvas2.height) - borderWidth, stepsX + offset, ((avgRain[i-1][2] * stepsY) + canvas2.height + offset)); //X, Y, laius, pikkus
				ctx2.fill();
				
				
			ctx2.closePath();
		}
	ctx2.closePath();
	
	
	
}

function rangeCon(old_value, old_min, old_max, new_min, new_max){
	// old_value = 10000
	// old_min = -16000
	// old_max = 16000
	// new_min = 0
	// new_max = 100	
	new_value = ( (old_value - old_min) / (old_max - old_min) ) * (new_max - new_min) + new_min;
	return new_value;
}

function drawCenterline(){
	ctx.strokeStyle = "black";
	ctx.lineWidth = 0.5;	
	ctx.beginPath();
		ctx.moveTo(0, canvas.height/2);
		ctx.lineTo(canvas.width, canvas.height/2);
		ctx.stroke();
	ctx.closePath();
}

function drawTempGraph(){
	let timeUnit = (canvas.width / avgTemp.length).toFixed(1);
	//console.log(timeUnit);
	let tempUnit = (canvas.height / 60).toFixed(1);
	//console.log(tempUnit);
	ctx.strokeStyle = "#666666";
	ctx.beginPath();
		ctx.moveTo(timeUnit, -(avgTemp[0][2] * tempUnit) + canvas.height / 2);
	
		for(let i = 1; i < avgTemp.length; i ++){			
			ctx.lineTo(timeUnit * (i + 1), -(avgTemp[i][2] * tempUnit) + canvas.height / 2);
			ctx.stroke();			
		}
		
		for(let i = 1; i < avgTemp.length; i ++){
			//Punkti joonsitamine
			if(avgTemp[i][2] > 0){
				ctx.beginPath();
					ctx.strokeStyle = "red";
					ctx.fillStyle = "red";
					ctx.arc(timeUnit * (i + 1),-(avgTemp[i][2] * tempUnit) + canvas.height / 2,2,0,Math.PI*2);
					ctx.fill();
					ctx.stroke();
				ctx.closePath();

			}else if (avgTemp[i][2] < 0){
				ctx.beginPath();
					ctx.strokeStyle = "blue";
					ctx.fillStyle = "blue";
					ctx.arc(timeUnit * (i + 1),-(avgTemp[i][2] * tempUnit) + canvas.height / 2,2,0,Math.PI*2);
					ctx.fill();
					ctx.stroke();
				ctx.closePath();
			}
		}
	ctx.closePath();
}

function startDrawing(e){
	let startX = e.clientX - e.target.offsetLeft + window.scrollX;
	let startY = e.clientY - e.target.offsetTop+ window.scrollY;
	ctx2.lineWidth = document.querySelector("#widthBtn").value;
	//ctx2.strokeStyle = document.querySelector("#colorVal").value; 
	//console.log(ctx2.strokeStyle);
	
	//pintsli joon
	let r = hexToRgb(document.querySelector("#colorVal").value).r;
	let g = hexToRgb(document.querySelector("#colorVal").value).g;
	let b = hexToRgb(document.querySelector("#colorVal").value).b;
	let a = document.querySelector("#alphaVal").value;
	ctx2.strokeStyle = "rgba("+r+","+g+","+b+","+a+")"; 
	
	//läbipastvus
	ctx2.globalAlpha = document.querySelector("#globalAlphaVal").value;
	
	ctx2.lineCap = "round";
	ctx2.lineJoin = "round";
	ctx2.beginPath();
		ctx2.moveTo(startX, startY);
		canvas2.addEventListener("mousemove", doDrawing);
}

function doDrawing(e){
	let mouseX = e.clientX - e.target.offsetLeft + window.scrollX;
	let mouseY = e.clientY - e.target.offsetTop+ window.scrollY;
	ctx2.lineTo(mouseX, mouseY);
	ctx2.stroke();
}

function stopDrawing(){
	canvas2.removeEventListener("mousemove", doDrawing);
	ctx2.closePath();
}

function hexToRgb(hex){
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function test(e){
	//console.log(e);
	
	let x = e.clientX - e.target.offsetLeft + window.scrollX;
	let y = e.clientY - e.target.offsetTop+ window.scrollY;
	
	ctx2.beginPath();
		ctx2.strokeStyle = "blue"; 
		ctx2.fillStyle = "blue";
		ctx2.arc(x, y, 2, 0, Math.PI*2);
		ctx2.fill();
		ctx2.stroke();
	ctx2.closePath();
}

function savePicture(){
	let picToSave = canvas2.toDataURL('image/png').replace("image/png", "image/octet-stream");
	this.href = picToSave;
}