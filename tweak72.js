const svg2png = require('svg2png');
const fs = require("fs");
const FS = require("pn/fs");
const path = require('path');


module.exports = function svg2buf (cb) {
	// returns a window with a document and an svg root node
	let window = require('svgdom');
		window.setFontDir('./fonts')
		.setFontFamilyMappings({'Open Sans': 'OpenSans-regular.ttf'})
		.preloadFonts();
	const SVG      = require('svg.js')(window);
	const document = window.document;

	// create svg.js instance
	const draw = SVG(document.documentElement).size(500, 500);
	let q = 'Какой-то умный \n человек \nпридумал\n  SVG\n  и это \nЗБС '
	let text = draw.text(q)
		.font({
			family: 'Open Sans',
			size: 36
		}).fill({ color: '#00DD88' });
	text.leading(1.5).move(20, 20);



	// get your svg as string
	let textSVG = draw.svg();
	let bufferSVG = Buffer.from(textSVG);
	console.log('textSVG', textSVG, '\n bufferSVG', bufferSVG);
	return bufferSVG;
}
// let now = Date.now();
// fs.writeFileSync('_img/_tw72_'+now+'.svg', bufferSVG);

