const sharp = require('sharp');
const request = require('request');
const Jimp = require('jimp');
const svg2buf  = require("./svg2buf");
// const path = require('path');


let imgURL = 'https://avatars1.githubusercontent.com/u/5002453?v=3&s=480';

Jimp.read(imgURL).then(function (image) {
	image.getBuffer(Jimp.AUTO, onBuffer);
}).catch(function (err) {
	console.error(err);
});

function onBuffer(err, buffer) {
	if (err) throw err;
	console.log('buffer', buffer);
	render(buffer);
}

function render(buffer) {
	let svgBuf = svg2buf();
	// let svgBufResized = sharp(svgBuf).resize(450, 450).toBuffer();,

	console.log('svgBUF', svgBuf);
	sharp(buffer)
		.overlayWith(svgBuf, { gravity: sharp.gravity.northeast } )
		.toFile('_img/_sharp05.png', function(err, info) {
			if (err) throw err;
			console.log('info', info)
		});
}

// sharp('_img/text1.svg')
// 	// .resize(600, 600)
// 	.toFile('_img/text1.png', function(err) {});

