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

skinViewer.loadBackground('../assets/Mangrove_House.webp');
skinViewer.zoom = 0.5;
animationChange('idle');

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

// Body
let bodies = [
    './assets/body/normalfemme.png',
    './assets/body/normalhomme.png',
];

const bodyColors = [
    '#FFDBAC',
    '#F1C27D',
    '#E0AC69',
    '#C68642',
    '#8D5524',
];

// Underwares
let underwares = [
    './assets/underware/Femme court.png',
    './assets/underware/Femme long.png',
    './assets/underware/homme court.png',
    './assets/underware/homme long.png',
];

// Hairs
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

const hairColors = [
    '#FAF0BE',
    '#282828',
    '#5A3214',
    '#DC95DC',
    '#50B4FF',
];

// Beards
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

// Eyes 
const eyesColors = [
    '#654321',
    '#0000FF',
    '#008000',
    '#B5AE60',
];

// Variables
var currBodyStyle = 0;
var currUnderwareStyle = 0;
var currBodyColor = bodyColors[1];
var currHairStyle = 0;
var currBeardStyle = 0;
var currEyebrowStyle = 0;
var hairColorHex = hairColors[0];
var eyesColorHex = eyesColors[0];

reloadImages();

/* Download */
var downloadLink = document.getElementById('downloadLink');
downloadLink.setAttribute('download', 'my-minecraft-skin.png');

/* Logic */
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

        finalImg = generatorCanvas.toDataURL('image/png');
        downloadLink.setAttribute('href', finalImg.replace("image/png", "image/octet-stream"));
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
    // body
    ctxBody.clearRect(0, 0, 128, 128);
    ctxBody.drawImage(img1, 0, 0, 128, 128);
    ctxBody.globalCompositeOperation = 'source-atop';
    ctxBody.fillStyle = currBodyColor;
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

function resetBtn(DOMName) {
    document.getElementById(DOMName).classList.remove('btn-primary');
    document.getElementById(DOMName).classList.add('btn-secondary');
}

function activeBtn(DOMName) {
    document.getElementById(DOMName).classList.add('btn-primary');
    document.getElementById(DOMName).classList.remove('btn-secondary');
}

// UI
function animationChange(selectedAnimation) {    
    document.getElementById('idleAnimBtn').classList.remove('btn-primary');
    document.getElementById('idleAnimBtn').classList.add('btn-secondary');

    document.getElementById('walkAnimBtn').classList.remove('btn-primary');
    document.getElementById('walkAnimBtn').classList.add('btn-secondary');

    document.getElementById('noneAnimBtn').classList.remove('btn-primary');
    document.getElementById('noneAnimBtn').classList.add('btn-secondary');

    switch (selectedAnimation)
    {
        case 'none':
            skinViewer.animation = null;
            document.getElementById('noneAnimBtn').classList.add('btn-primary');
            document.getElementById('noneAnimBtn').classList.remove('btn-secondary');
            break;
        case 'idle':
            skinViewer.animation = availableAnimations['idle'];
            skinViewer.animation.speed = 1;
            document.getElementById('idleAnimBtn').classList.add('btn-primary');
            document.getElementById('idleAnimBtn').classList.remove('btn-secondary');
            break;
        case 'walk':
            skinViewer.animation = availableAnimations['walk'];
            skinViewer.animation.speed = 1;
            document.getElementById('walkAnimBtn').classList.add('btn-primary');
            document.getElementById('walkAnimBtn').classList.remove('btn-secondary');
            break;
    }
}

/* Refresh */
var refreshBtn = document.getElementById('refreshBtn');
refreshBtn.addEventListener('click', function() {
    window.location.reload();
});

/* Animation */
var idleAnimBtn = document.getElementById('idleAnimBtn');
idleAnimBtn.addEventListener('click', function() {
    animationChange('idle');
});

var walkAnimBtn = document.getElementById('walkAnimBtn');
walkAnimBtn.addEventListener('click', function() {
    animationChange('walk');
});

var noneAnimBtn = document.getElementById('noneAnimBtn');
noneAnimBtn.addEventListener('click', function() {
    animationChange('none');
});

/* Body gender */
document.getElementById('bodyGenderWoman').addEventListener('click', function() {
    resetBtn('bodyGenderMan');
    activeBtn('bodyGenderWoman');
    currBodyStyle = 0;
    reloadImages();
    draw();
});

document.getElementById('bodyGenderMan').addEventListener('click', function() {
    resetBtn('bodyGenderWoman');
    activeBtn('bodyGenderMan');
    currBodyStyle = 1;
    reloadImages();
    draw();
});

/* Body Color */
function updateColor(newColor) {
    currBodyColor = newColor;
    draw();
}
bodyColors.forEach(x => {
    let button = document.createElement("button");
    button.className = "btn btn-secondary btn-color"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateColor(x);
    document.getElementById('body-colors').appendChild(button);
});
{
    let input = document.createElement("input");
    input.type = "color";
    input.className = "btn btn-secondary btn-color btn-color-rainbow";
    input.addEventListener('input', function() {
        updateColor(input.value);
    }, false);
    document.getElementById('body-colors').appendChild(input);
}

/* Underware */
function updateUnderware(index) {
    currUnderwareStyle = index;
    reloadImages();
    draw();
}
underwares.forEach((x, i) => {
    let button = document.createElement("button");
    button.innerHTML = i;
    button.className = "btn btn-secondary btn-sm mr-3px"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateUnderware(i);
    document.getElementById('underware-style').appendChild(button);
});

/* Hair style */
function updateHairStyle(index) {
    currHairStyle = index;
    reloadImages();
    draw();
}
hairs.forEach((x, i) => {
    let button = document.createElement("button");
    button.innerHTML = i;
    button.className = "btn btn-secondary btn-sm mr-3px"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateHairStyle(i);
    document.getElementById('hair-style').appendChild(button);
});

/* Hair color */
function updateHairColor(color) {
    hairColorHex = color;
    draw();
}
hairColors.forEach(x => {
    let button = document.createElement("button");
    button.className = "btn btn-secondary btn-color"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateHairColor(x);
    document.getElementById('hair-colors').appendChild(button);
});
{
    let input = document.createElement("input");
    input.type = "color";
    input.className = "btn btn-secondary btn-color btn-color-rainbow";
    input.addEventListener('input', function() {
        updateHairColor(input.value);
    }, false);
    document.getElementById('hair-colors').appendChild(input);
}

/* Eyes color */
function updateEyesColor(color) {
    eyesColorHex = color;
    draw();
}
eyesColors.forEach(x => {
    let button = document.createElement("button");
    button.className = "btn btn-secondary btn-color"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateEyesColor(x);
    document.getElementById('eyes-color').appendChild(button);
});
{
    let input = document.createElement("input");
    input.type = "color";
    input.className = "btn btn-secondary btn-color btn-color-rainbow";
    input.addEventListener('input', function() {
        updateEyesColor(input.value);
    }, false);
    document.getElementById('eyes-color').appendChild(input);
}

/* Beard */
function updateBeardStyle(index) {
    currBeardStyle = index;
    reloadImages();
    draw();
}
beards.forEach((x, i) => {
    let button = document.createElement("button");
    button.innerHTML = i;
    button.className = "btn btn-secondary btn-sm mr-3px"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateBeardStyle(i);
    document.getElementById('beard-style').appendChild(button);
});

/* Eyebrows */
function updateEyebrowsStyle(index) {
    currEyebrowStyle = index;
    reloadImages();
    draw();
}
eyebrows.forEach((x, i) => {
    let button = document.createElement("button");
    button.innerHTML = i;
    button.className = "btn btn-secondary btn-sm mr-3px"; // add the class
    button.style.backgroundColor = x; // set the style
    button.onclick = () => updateEyebrowsStyle(i);
    document.getElementById('eyebrows-style').appendChild(button);
});
