const Jimp = require("jimp");
const url = require('url');
const PNG = require("pngjs").PNG;
const JPEG = require("jpeg-js");
var BMP = require("bmp-js");
var MIME = require("mime");
var FS = require("fs");

/*

Jimp.read("lenna.png").then(function (lenna) {
	lenna.resize(256, 256)            // resize
		.quality(60)                 // set JPEG quality
		.greyscale()                 // set greyscale
		.write("lena-small-bw.jpg"); // save
}).catch(function (err) {
	console.error(err);
});
Jimp.read("sm1.jpeg").then(function (lenna) {
	lenna.resize(256, 256)            // resize
		.quality(60)                 // set JPEG quality
		.greyscale()                 // set greyscale
		.write("sm1.png"); // save
}).catch(function (err) {
	console.error(err);
});
*/



function jpeg2png(image) {
	// let buffer = JPEG.decode(image);
	
	console.log('Jimp.MIME_PNG', Jimp.MIME_PNG);
	
	Jimp.read("sm1.jpeg").then(function (img) {

		Jimp.loadFont( Jimp.FONT_SANS_64_WHITE )
			.then(function (font) {
				//let image = img.resize(256, 256);            // resize

				image.print(font, 50, 50, 'LOUD', 400);
				// jWrite.call(image, "sm505.png"); // save
				jBuffer.call(image, Jimp.MIME_PNG , function(err, buf){
					console.log('buf', buf);
					
				}); // save
			});



	}).catch(function (err) {
		console.error(err);
	});

}

jpeg2png();

function jBuffer (mime, cb) {
	console.log('mime', mime);
	this.getBuffer(mime, function(err, buffer) {
		cb (buffer);
	});

	return this;
};

function jWrite (path, cb) {
	if ("string" != typeof path)
		return throwError.call(this, "path must be a string", cb);
	if ("undefined" == typeof cb) cb = function () {};
	if ("function" != typeof cb)
		return throwError.call(this, "cb must be a function", cb);

	var that = this;
	var mime = MIME.lookup(path);
	console.log('mime', mime);


	this.getBuffer(mime, function(err, buffer) {
		if (err) return throwError.call(that, err, cb);
		var stream = FS.createWriteStream(path);
		stream.on("open", function(fh) {
			stream.write(buffer);
			stream.end();
		}).on("error", function(err) {
			return throwError.call(that, err, cb);
		});
		stream.on("finish", function(fh) {
			return cb.call(that, null, that);
		});
	});

	return this;
};

