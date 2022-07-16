let canvas;
let ctx;

window.onload = function(){
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");
	drawExample();
}

function drawExample(){
	//joonevärv
	ctx.strokeStyle = "rgb(255,150,0)";
	//joonepaksus
	ctx.lineWidth = 10;
	//täitevärv
	ctx.fillStyle = "rgba(200,210,255,0.5)";
	
	//ristkülik
	ctx.beginPath();
		ctx.rect(100,100,200,300);
		ctx.stroke();
		ctx.fill();
	ctx.closePath();
	
	ctx.strokeStyle = "rgb(255,0,0)";
	ctx.beginPath();
		ctx.rect(180,180,200,300);
		ctx.stroke();
	ctx.closePath();
	
	ctx.fillStyle = "rgb(200,255,200)";
	ctx.strokeRect(40,40,40,40);
	ctx.fillRect(40,90,40,40);
	
	//ring
	//ringi ei saa, saab kaart
	ctx.beginPath();
		//keskpunkti x, y  , raadius  , alustamise nurk, lõpetamise nurk
		ctx.arc(380,180,150,0,Math.PI);
		ctx.stroke();
		ctx.fill();
	ctx.closePath();
	
	//joon
	//sirge
	ctx.strokeStyle = "rgb(255,0,255)";
	ctx.beginPath();
		//alustades pliiats alguspunkti
		ctx.moveTo(0, canvas.height/2);
		ctx.lineTo(canvas.width, canvas.height/2);
		ctx.stroke();
	ctx.closePath();
	//kõverjoon ühe kontrollpunktiga	
	ctx.beginPath();
		//alustades pliiats alguspunkti
		ctx.moveTo(0, canvas.height/2);
		ctx.quadraticCurveTo(canvas.width / 2, 0, canvas.width, canvas.height/2);
		ctx.stroke();
	ctx.closePath();
	//kõverjoon kahe kontrollpunktiga
	ctx.beginPath();
		//alustades pliiats alguspunkti
		ctx.moveTo(0, canvas.height/2);
		ctx.bezierCurveTo(canvas.width / 3, 0, canvas.width / 3 * 2, canvas.height, canvas.width, canvas.height/2);
		ctx.stroke();
	ctx.closePath();
	
	ctx.fillStyle = "yellow";
	ctx.beginPath();
		ctx.arc(600,150, 100, .2* Math.PI, 1.8* Math.PI);
		ctx.lineTo(600,150);
		ctx.fill();
	ctx.closePath();
}

//ctx.fillStyle = "hsl(45, 100%, 50%)";