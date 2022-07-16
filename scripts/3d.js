let cube;
let xAngle = 0;
let yAngle = 0;

window.onload = function(){
	cube = document.querySelector("#cube");
	spin3d();
}

function spin3d(){
	cube.style.transform = "scale(.5) rotateX(" + (xAngle%360) + "deg) rotateY(" + (yAngle%360) + "deg)";
	xAngle ++;
	yAngle += .5;
	requestAnimationFrame(spin3d);
}
