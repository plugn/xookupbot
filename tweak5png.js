const svg2png = require('svg2png');
const fs = require("fs");
const FS = require("pn/fs");
const path = require('path');

// returns a window with a document and an svg root node
let window = require('svgdom');
	window.setFontDir('./fonts')
	// map the font-family to the file
	.setFontFamilyMappings({'Open Sans': 'OpenSans-regular.ttf'})
	// you can preload your fonts to avoid the loading delay
	// when the font is used the first time
	.preloadFonts();
const SVG      = require('svg.js')(window)
const document = window.document;

// create svg.js instance
const draw = SVG(document.documentElement).size(500, 500);
// use svg.js as normal
var imgURL = 'https://avatars1.githubusercontent.com/u/5002453?v=3&s=480';





draw.image(imgURL).size(500, 500); // size is IMPORTANT!
var q = 'Какой-то умный \n человек \nпридумал\n  SVG\n  и это \nЗБС '
var text = draw.text(q)
	.font({
		family: 'Open Sans',
		size: 36
	}).fill({ color: '#fff' });
text.leading(1.5).move(20, 20);



// get your svg as string
let textSVG = draw.svg();
let bufferSVG = Buffer.from(textSVG);
let now = Date.now();
console.log('textSVG', textSVG, '\n bufferSVG', bufferSVG);
fs.writeFileSync('_img/svg_'+now+'.svg', bufferSVG);

svg2png(bufferSVG)
	.then(function (buffer) {
		FS.writeFile('_img/svg_'+now+'.png', buffer)
			.then(data => console.log('data: ', buffer))
			.catch(e => console.error(e))
	})
	.catch(e => console.error(e));
