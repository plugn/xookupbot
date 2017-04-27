const path = require('path');

let window = require('svgdom');
	// returns a window with a document and an svg root node

	window.setFontDir(path.resolve('fonts'))
		.setFontFamilyMappings({'Open Sans': 'OpenSans-Regular.ttf'})
		.preloadFonts();
const SVG      = require('svg.js')(window);

module.exports = function svg2buf (options) {
	options = options || {};

	let document = window.document;
	document.documentElement.textContent = '';

	// create svg.js instance
	let draw = SVG(document.documentElement).size(300, 300);
	let q = options.text || options.q || 'Какой-то умный \n человек \nпридумал\n  SVG\n  и это \nЗБС ';
	let text = draw.text(q)
		.font({
			family: 'Open Sans',
			size: 36
		}).fill({ color: options.color || '#222222' });

	text.leading(1.5).move(20, 20);



	// get your svg as string
	let textSVG = draw.svg();
	let bufferSVG = Buffer.from(textSVG);
	console.log('textSVG', textSVG, '\n bufferSVG', bufferSVG);
	return bufferSVG;
};

