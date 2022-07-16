let canvas2;
let ctx2;

window.onload = function(){
	canvas2 = document.querySelector("#canvas2");
	canvas2.style.backgroundColor = "white";
	canvas2.style.border = "1px solid black";
	ctx2 = canvas2.getContext("2d");
	drawRainGraph();
}

function drawRainGraph(){
	let stepsX = (canvas2.width / avgRain.length).toFixed(1);
	//console.log(timeUnit22);
	let stepsY = (canvas2.height / 255).toFixed(1);
	//console.log(tempUnit);
	ctx2.strokeStyle = "#666666";
	ctx2.beginPath();
		ctx2.moveTo(stepsX, -(avgRain[0][2] * stepsY) + canvas2.height);
	
		for(let i = 1; i < avgRain.length; i ++){			
			ctx2.lineTo(stepsX * (i + 1), -(avgRain[i][2] * stepsY) + canvas2.height);
			ctx2.stroke();			
		}
		
		for(let i = 1; i < avgRain.length; i ++){
			//Punkti joonsitamine
			if(avgRain[i][2] > 0){
				ctx2.beginPath();
					ctx2.strokeStyle = "red";
					ctx2.fillStyle = "red";
					ctx2.arc(stepsX * (i + 1), -(avgRain[i][2] * stepsY) + canvas2.height,2,0,Math.PI*2);
					ctx2.fill();
					ctx2.stroke();
				ctx2.closePath();

			}else if (avgRain[i][2] < 0){
				ctx2.beginPath();
					ctx2.strokeStyle = "blue";
					ctx2.fillStyle = "blue";
					ctx2.arc(stepsX * (i + 1), -(avgRain[i][2] * stepsY) + canvas2.height,2,0,Math.PI*2);
					ctx2.fill();
					ctx2.stroke();
				ctx2.closePath();
			}
		}
	ctx2.closePath();
}