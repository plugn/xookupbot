const sharp = require('sharp');
const Jimp = require('jimp');
const svg2buf  = require("./svg2buf");

module.exports = function imgproc (bgURL, overlay, callback, errorCallback) {
console.log('imgproc overlay', overlay)
	Jimp.read(bgURL).then(function (image) {
		image.getBuffer(Jimp.AUTO, onBuffer);
	}).catch(function (err) {
		console.error(err);
		errorCallback('try message format:\n\n{URL}\nтекст\nтекст2');
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
			.resize(512, 512)
			// .max()
			.overlayWith(svgBuf, { gravity: sharp.gravity[overlay.gravity || 'northwest']})
			.png()
			.toBuffer()
			.then(callback)
	}
};

