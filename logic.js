// 2D canvas
var canvas = document.getElementById('canvas');
var hairCanvas = document.getElementById('hairCanvas');
var beardCanvas = document.getElementById('beardCanvas');
var eyebrowCanvas = document.getElementById('eyebrowCanvas');
var generatorCanvas = document.getElementById('generatorCanvas');

canvas.width = hairCanvas.width = beardCanvas.width = eyebrowCanvas.width = generatorCanvas.width = 128;
canvas.height = hairCanvas.height = beardCanvas.height = eyebrowCanvas.height = generatorCanvas.height = 128;

var ctxBody = canvas.getContext('2d');
var ctxHair = hairCanvas.getContext('2d');
var ctxBeard = beardCanvas.getContext('2d');
var ctxEyebrow = eyebrowCanvas.getContext('2d');
var ctxGenerator = generatorCanvas.getContext('2d');

// 3D canvas
var skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById('skin-container'),
    width: document.body.clientWidth - 360,
    height: document.body.clientHeight
});

window.onresize = (event) => {
    skinViewer.width = document.body.clientWidth - 360;
	skinViewer.height = document.body.clientHeight;
};

const availableAnimations = {
	idle: new skinview3d.IdleAnimation(),
	walk: new skinview3d.WalkingAnimation(),
};

const skinParts = ['head', 'body', 'rightArm', 'leftArm', 'rightLeg', 'leftLeg'];
const skinLayers = ['innerLayer', 'outerLayer'];

skinViewer.loadPanorama('../assets/panorama.png');
skinViewer.zoom = 0.5;

// Assets
var img1;
var img1_1;
var img2;
var img3;
var img4;

var bodyImg = null;
var hairImg = null;
var beardImg = null;
var eyebrowImg = null;

var imagesLoaded = 0;
var finalImageInGeneration = false;
var finalImagesLoaded = 0;

// Get assets 
//const path = require('path');
//const fs = require('fs');

// Body
/*
const bodyDirectoryPath = path.join(__dirname, '..', 'assets', 'body');
const bodyFiles = fs.readdirSync(bodyDirectoryPath);

let bodies = [];
bodyFiles.forEach((body) => {
    bodies.push(path.join(bodyDirectoryPath, body));
});
console.log('Bodies:', bodies);
*/
let bodies = [
    './assets/body/normalfemme.png',
    './assets/body/normalhomme.png',
];

// Underwares
/*
const underwaresDirectoryPath = path.join(__dirname, '..', 'assets', 'underware');
const underwaresFiles = fs.readdirSync(underwaresDirectoryPath);

let underwares = [];
underwaresFiles.forEach((underware) => {
    underwares.push(path.join(underwaresDirectoryPath, underware));
});
console.log('Underwares:', underwares);
*/
let underwares = [
    './assets/underware/Femme court.png',
    './assets/underware/Femme long.png',
    './assets/underware/homme court.png',
    './assets/underware/homme long.png',
];

// Hairs
/*
const hairDirectoryPath = path.join(__dirname, '..', 'assets', 'hair');
const hairFiles = fs.readdirSync(hairDirectoryPath);

let hairs = [];
hairFiles.forEach((hair) => {
    hairs.push(path.join(hairDirectoryPath, hair));
});
console.log('Hairs:', hairs);
*/
let hairs = [
    './assets/hair/Chauve.png',
    './assets/hair/Femme 1.png',
    './assets/hair/Femme 2.png',
    './assets/hair/Femme 3.png',
    './assets/hair/Femme 4.png',
    './assets/hair/Femme 5.png',
    './assets/hair/Femme 6.png',
    './assets/hair/Femme 7.png',
    './assets/hair/Homme 1.png',
    './assets/hair/Homme 2.png',
    './assets/hair/Homme 3.png',
    './assets/hair/Homme 4.png',
    './assets/hair/Homme 5.png',
    './assets/hair/Homme 6.png',
    './assets/hair/Homme 7.png',
];

// Beards
/*
const beardDirectoryPath = path.join(__dirname, '..', 'assets', 'beard');
const beardFiles = fs.readdirSync(beardDirectoryPath);

let beards = [];
beardFiles.forEach((beard) => {
    beards.push(path.join(beardDirectoryPath, beard));
});
console.log('Beards:', beards);
*/
let beards = [
    './assets/beard/1.png',
    './assets/beard/Femme 1.png',
    './assets/beard/Femme 2.png',
    './assets/beard/Femme 3.png',
    './assets/beard/Homme 1.png',
    './assets/beard/Homme 2.png',
    './assets/beard/Homme 3.png',
    './assets/beard/Homme 4.png',
    './assets/beard/Homme 5.png',
    './assets/beard/Homme 6.png',
    './assets/beard/Homme 7.png',
];

// Eyebrows
/*
const eyebrowDirectoryPath = path.join(__dirname, '..', 'assets', 'eyebrow');
const eyebrowFiles = fs.readdirSync(eyebrowDirectoryPath);

let eyebrows = [];
eyebrowFiles.forEach((eyebrow) => {
    eyebrows.push(path.join(eyebrowDirectoryPath, eyebrow));
});
console.log('Eyebrows:', eyebrows);
*/
let eyebrows = [
    './assets/eyebrow/1.png',
    './assets/eyebrow/Femme 1.png',
    './assets/eyebrow/Femme 2.png',
    './assets/eyebrow/Femme 3.png',
    './assets/eyebrow/Femme 4.png',
    './assets/eyebrow/Femme 5.png',
    './assets/eyebrow/Femme 6.png',
    './assets/eyebrow/Femme 7.png',
    './assets/eyebrow/Homme 1.png',
    './assets/eyebrow/Homme 2.png',
    './assets/eyebrow/Homme 3.png',
    './assets/eyebrow/Homme 4.png',
    './assets/eyebrow/Homme 5.png',
    './assets/eyebrow/Homme 6.png',
    './assets/eyebrow/Homme 7.png',
];

// Variables
const bodyColors = [
    '#FFDBAC',
    '#F1C27D',
    '#E0AC69',
    '#C68642',
    '#8D5524',
];

var currBodyStyle = 0;
var currUnderwareStyle = 0;
var currBodyColor = 1;
var currHairStyle = 0;
var currBeardStyle = 0;
var currEyebrowStyle = 0;
var hairColorHex = '#000000';
var eyesColorHex = '#000000';

reloadImages();

function drawPixel(context, x, y, color) {
	var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.fillStyle = color || '#000';
  	context.fillRect(roundedX, roundedY, 1, 1);
}

function draw3D() {
    finalImagesLoaded += 1;

    if (finalImagesLoaded == 4 && finalImageInGeneration) {
        ctxGenerator.clearRect(0, 0, 128, 128);
        ctxGenerator.drawImage(bodyImg, 0, 0);
        ctxGenerator.drawImage(hairImg, 0, 0);
        ctxGenerator.drawImage(beardImg, 0, 0);
        ctxGenerator.drawImage(eyebrowImg, 0, 0);

        var finalImg = generatorCanvas.toDataURL('image/png');
        skinViewer.loadSkin(finalImg);

        finalImagesLoaded = 0;
        bodyImg = null;
        hairImg = null;
        beardImg = null;
        eyebrowImg = null;
        finalImageInGeneration = false;
    }
}

function drawPixel(context, x, y, color) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    context.fillStyle = color || '#000';
    context.fillRect(roundedX, roundedY, 1, 1);
};

function draw() {
    for (const part of skinParts) {
        for (const layer of skinLayers) {
            skinViewer.playerObject.skin[part][layer].visible =
                document.querySelector(`#layers_table input[type="checkbox"][data-part="${part}"][data-layer="${layer}"]`).checked;
        }
    }

    // body
    ctxBody.clearRect(0, 0, 128, 128);
    ctxBody.drawImage(img1, 0, 0, 128, 128);
    ctxBody.globalCompositeOperation = 'source-atop';
    ctxBody.fillStyle = bodyColors[currBodyColor];
    ctxBody.fillRect(0, 0, 128, 128);
    ctxBody.globalCompositeOperation = 'multiply';
    ctxBody.drawImage(img1, 0, 0, 128, 128);
    ctxBody.globalCompositeOperation = 'source-over';
    ctxBody.drawImage(img1_1, 0, 0, 128, 128);

    // Eyes
    drawPixel(ctxBody, 18, 24, '#ffffff');
    drawPixel(ctxBody, 19, 24, '#ffffff');
    drawPixel(ctxBody, 18, 25, '#ffffff');
    drawPixel(ctxBody, 19, 25, '#ffffff');
    drawPixel(ctxBody, 20, 24, eyesColorHex);
    drawPixel(ctxBody, 21, 24, eyesColorHex);
    drawPixel(ctxBody, 20, 25, eyesColorHex);
    drawPixel(ctxBody, 21, 25, eyesColorHex);

    drawPixel(ctxBody, 26, 24, eyesColorHex);
    drawPixel(ctxBody, 27, 24, eyesColorHex);
    drawPixel(ctxBody, 26, 25, eyesColorHex);
    drawPixel(ctxBody, 27, 25, eyesColorHex);
    drawPixel(ctxBody, 28, 24, '#ffffff');
    drawPixel(ctxBody, 29, 24, '#ffffff');
    drawPixel(ctxBody, 28, 25, '#ffffff');
    drawPixel(ctxBody, 29, 25, '#ffffff');

    // Mouth
    drawPixel(ctxBody, 22, 28, '#C59A92');
    drawPixel(ctxBody, 23, 28, '#C59A92');
    drawPixel(ctxBody, 24, 28, '#C59A92');
    drawPixel(ctxBody, 25, 28, '#C59A92');
    drawPixel(ctxBody, 22, 29, '#C59A92');
    drawPixel(ctxBody, 23, 29, '#C59A92');
    drawPixel(ctxBody, 24, 29, '#C59A92');
    drawPixel(ctxBody, 25, 29, '#C59A92');

    // Beard
    ctxBeard.clearRect(0, 0, 128, 128);
    ctxBeard.drawImage(img3, 0, 0, 128, 128);
    ctxBeard.globalCompositeOperation = 'source-atop';
    ctxBeard.fillStyle = hairColorHex;
    ctxBeard.fillRect(0, 0, 128, 128);
    ctxBeard.globalCompositeOperation = 'multiply';
    ctxBeard.drawImage(img3, 0, 0, 128, 128);
    ctxBeard.globalCompositeOperation = 'source-over';

    // Eyebrow
    ctxEyebrow.clearRect(0, 0, 128, 128);
    ctxEyebrow.drawImage(img4, 0, 0, 128, 128);
    ctxEyebrow.globalCompositeOperation = 'source-atop';
    ctxEyebrow.fillStyle = hairColorHex;
    ctxEyebrow.fillRect(0, 0, 128, 128);
    ctxEyebrow.globalCompositeOperation = 'multiply';
    ctxEyebrow.drawImage(img4, 0, 0, 128, 128);
    ctxEyebrow.globalCompositeOperation = 'source-over';

    // hair
    ctxHair.clearRect(0, 0, 128, 128);
    ctxHair.drawImage(img2, 0, 0, 128, 128);
    ctxHair.globalCompositeOperation = 'source-atop';
    ctxHair.fillStyle = hairColorHex;
    ctxHair.fillRect(0, 0, 128, 128);
    ctxHair.globalCompositeOperation = 'multiply';
    ctxHair.drawImage(img2, 0, 0, 128, 128);
    ctxHair.globalCompositeOperation = 'source-over';

    if (!finalImageInGeneration) {
        finalImageInGeneration = true;
        bodyImg = loadImage(canvas.toDataURL('image/png'), draw3D);
        hairImg = loadImage(hairCanvas.toDataURL('image/png'), draw3D);
        beardImg = loadImage(beardCanvas.toDataURL('image/png'), draw3D);
        eyebrowImg = loadImage(eyebrowCanvas.toDataURL('image/png'), draw3D);
    }
}

function main() {
	imagesLoaded += 1;

	if (imagesLoaded == 5) {
    	draw();
	}
}

function loadImage(src, onload) {
    var img = new Image();
    img.crossOrigin = 'anonymous';

	img.onload = onload;
	img.src = src;

	return img;
}

function reloadImages() {
    imagesLoaded = 0;
    img1 = loadImage(bodies[currBodyStyle], main);
    img1_1 = loadImage(underwares[currUnderwareStyle], main);
    img2 = loadImage(hairs[currHairStyle], main);
    img3 = loadImage(beards[currBeardStyle], main);
    img4 = loadImage(eyebrows[currEyebrowStyle], main);
}

// UI
const animationRadio = document.querySelectorAll('input[name="animationRadio"]');
function animationChange() {
    let selectedAnimation;
    for (const radioButton of animationRadio) {
        if (radioButton.checked) {
            selectedAnimation = radioButton.value;
            break;
        }
    }
    
    switch (selectedAnimation)
    {
        case 'none':
            skinViewer.animation = null;
            break;
        case 'idle':
            skinViewer.animation = availableAnimations['idle'];
            skinViewer.animation.speed = 1;
            break;
        case 'walk':
            skinViewer.animation = availableAnimations['walk'];
            skinViewer.animation.speed = 1;
            break;
    }
}

for (const radioButton of animationRadio) {
    radioButton.addEventListener('change', animationChange);
}   

var refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', function() {
    window.location.reload();
});

var bodyStyle = document.getElementById('bodyStyle');
bodyStyle.max = bodies.length - 1;
bodyStyle.addEventListener('input', function() {
    currBodyStyle = bodyStyle.value;
    reloadImages();
    draw();
}, false);

var underwareStyle = document.getElementById('underwareStyle');
underwareStyle.max = underwares.length - 1;
underwareStyle.addEventListener('input', function() {
    currUnderwareStyle = underwareStyle.value;
    reloadImages();
    draw();
}, false);

var bodyColor = document.getElementById('bodyColor');
bodyColor.max = bodyColors.length - 1;
bodyColor.addEventListener('input', function() {
    currBodyColor = bodyColor.value;
    draw();
}, false);

var hairStyle = document.getElementById('hairStyle');
hairStyle.max = hairs.length - 1;
hairStyle.addEventListener('input', function() {
    currHairStyle = hairStyle.value;
    reloadImages();
    draw();
}, false);

var hairColor = document.getElementById('hairColor');
hairColor.addEventListener('input', function() {
    hairColorHex = hairColor.value;
    draw();
}, false);

var eyesColor = document.getElementById('eyesColor');
eyesColor.addEventListener('input', function() {
    eyesColorHex = eyesColor.value;
    draw();
}, false);

var beardStyle = document.getElementById('beardStyle');
beardStyle.max = beards.length - 1;
beardStyle.addEventListener('input', function() {
    currBeardStyle = beardStyle.value;
    reloadImages();
    draw();
}, false);

var eyebrowStyle = document.getElementById('eyebrowStyle');
eyebrowStyle.max = eyebrows.length - 1;
eyebrowStyle.addEventListener('input', function() {
    currEyebrowStyle = eyebrowStyle.value;
    reloadImages();
    draw();
}, false);

for (const part of skinParts) {
    for (const layer of skinLayers) {
        document.querySelector(`#layers_table input[type="checkbox"][data-part="${part}"][data-layer="${layer}"]`)
            .addEventListener("change", function(e) { 
                skinViewer.playerObject.skin[part][layer].visible = e.target.checked;
                draw();
            });
    }
}