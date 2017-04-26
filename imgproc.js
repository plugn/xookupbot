const sharp = require('sharp');
const Jimp = require('jimp');
const svg2buf  = require("./svg2buf");


let imgURL = 'https://avatars1.githubusercontent.com/u/5002453?v=3&s=480';

module.exports = function imgproc (bgURL, overlay, callback) {


	Jimp.read(bgURL).then(function (image) {
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
		let svgBuf = svg2buf(overlay || {});
		// let svgBufResized = sharp(svgBuf).resize(450, 450).toBuffer();,

		console.log('svgBUF', svgBuf);
		sharp(buffer)
			.crop(512, 512)
			// .max()
			.overlayWith(svgBuf, {gravity: sharp.gravity.northeast})
			.png()
			.toBuffer()
			.then(callback)
	}
};
// sharp('_img/text1.svg')
// 	// .resize(600, 600)
// 	.toFile('_img/text1.png', function(err) {});

