let src = "./media/pilved_";
let ext = ".jpg";
let num = Math.floor(Math.random() * 4)+1;

window.onload = function() {
	newImage();
	document.querySelector("#Img").addEventListener("click", newImage);
}

function newImage() {
	let file = src + num + ext;
	num++;
	if(num>5){
		num=1;
	}
	document.querySelector("#Img").src=file;
}
