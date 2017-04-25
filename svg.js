const svg2png = require('svg2png');
const FS = require("pn/fs");
const path = require('path');

//let svgURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Example.svg/1200px-Example.svg.png';
let svgURL = '_img/ext-sm2jpeg.svg';

FS.readFile(svgURL)
	.then(function (srcBuffer) {
		svg2png(srcBuffer, { filename: path.resolve(__dirname, svgURL) })
			.then(function (buffer) {
				FS.writeFile(svgURL+'.png', buffer)
					.then(data => console.log('data: ', buffer))
					.catch(e => console.error(e))
			})
			.catch(e => console.error(e));
	})
	.catch(e => console.error(e));

/*
 svg2png(sourceBuffer, { url: "https://example.com/awesomeness.svg" })

 svg2png(sourceBuffer, { filename: path.resolve(__dirname, "images/fun.svg") })


$(npm bin)/phantomjs rasterize.js _img/ext101.svg _img/ext102.png 256px*256px
// args ["rasterize.js","_img/ext101.svg","_img/ext102.png","256px*256px"]

*/