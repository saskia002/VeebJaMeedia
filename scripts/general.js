 window.onload = function(){
    //  alert('töötab');
    randomPic();
    document.querySelector('#tlnPic').addEventListener('click', randomPic);
}

let tlnPicURL = "http://greeny.cs.tlu.ee/~rinde/media/photos/tallinn600x450/tln_"
let tlnPicExt = ".JPG"
let minPicNum = 1;
let maxPicNum = 183; 

function randomPic(){
    let randomNum = minPicNum + Math.round(Math.random() * (maxPicNum - minPicNum));
    // console.log(randomNum);

    document.querySelector('#tlnPic').src = tlnPicURL + randomNum + tlnPicExt;
}