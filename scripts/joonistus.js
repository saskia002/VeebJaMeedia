let canvas;
let ctx;

window.onload = function(){
	canvas = document.querySelector("#canvas");
	canvas.style.backgroundColor = "white";
	canvas.style.border = "1px solid black";
	ctx = canvas.getContext("2d");
	//ctx.translate(0.01, 0.01);
	ctx.imageSmoothingEnabled = true;
	ctx.shadowBlur = 1
	ctx.shadowColor = 'black'
	
	//canvas.addEventListener("mousedown", test);
	
	canvas.addEventListener("mousedown", startDrawing);
	canvas.addEventListener("mouseup", stopDrawing);
	canvas.addEventListener("mouseout", stopDrawing);	
	
	//pildi alla laadimine
	document.querySelector("#saveBtn").addEventListener("click", savePicture);
}

function startDrawing(e){
	let startX = e.clientX - e.target.offsetLeft + window.scrollX;
	let startY = e.clientY - e.target.offsetTop+ window.scrollY;
	ctx.lineWidth = document.querySelector("#widthBtn").value;
	//ctx.strokeStyle = document.querySelector("#colorVal").value; 
	//console.log(ctx.strokeStyle);
	
	//pintsli joon
	let r = hexToRgb(document.querySelector("#colorVal").value).r;
	let g = hexToRgb(document.querySelector("#colorVal").value).g;
	let b = hexToRgb(document.querySelector("#colorVal").value).b;
	let a = document.querySelector("#alphaVal").value;
	ctx.strokeStyle = "rgba("+r+","+g+","+b+","+a+")"; 
	
	//läbipastvus
	ctx.globalAlpha = document.querySelector("#globalAlphaVal").value;
	
	ctx.lineCap = "round";
	ctx.lineJoin = "round";
	ctx.beginPath();
		ctx.moveTo(startX, startY);
		canvas.addEventListener("mousemove", doDrawing);
}

function doDrawing(e){
	let mouseX = e.clientX - e.target.offsetLeft + window.scrollX;
	let mouseY = e.clientY - e.target.offsetTop+ window.scrollY;
	ctx.lineTo(mouseX, mouseY);
	ctx.stroke();
}

function stopDrawing(){
	canvas.removeEventListener("mousemove", doDrawing);
	ctx.closePath();
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
	
	ctx.beginPath();
		ctx.strokeStyle = "blue"; 
		ctx.fillStyle = "blue";
		ctx.arc(x, y, 2, 0, Math.PI*2);
		ctx.fill();
		ctx.stroke();
	ctx.closePath();
}

function savePicture(){
	let picToSave = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	this.href = picToSave;
}