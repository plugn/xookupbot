const Jimp = require("jimp");
const url = require('url');
const PNG = require("pngjs").PNG;
const JPEG = require("jpeg-js");

var BMP = require("bmp-js");
var MIME = require("mime");
var TinyColor = require("tinycolor2");
var Resize = require("./resize.js");
var Resize2 = require("./resize2.js");
var StreamToBuffer = require("stream-to-buffer");
var ReadChunk = require("read-chunk");
var FileType = require("file-type");
var PixelMatch = require("pixelmatch");
var EXIFParser = require("exif-parser");
var ImagePHash = require("./phash.js");
var BigNumber = require('bignumber.js');
var URLRegEx = require("url-regex");
var BMFont = require("load-bmfont");
var Path = require("path");


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
	Jimp.read("sm1.jpeg").then(function (img) {
		let obj = img.resize(256, 256)            // resize
			.quality(60)                 // set JPEG quality
			.greyscale();                 // set greyscale

		jWrite.call(obj, "sm501.png",
			function(err,v){console.log('done', v);}
		); // save
	}).catch(function (err) {
		console.error(err);
	});

}

jpeg2png();

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

