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
var img = 'https://avatars1.githubusercontent.com/u/5002453?v=3&s=480';





var image = draw.image(img).size(500, 500); // size is IMPORTANT!
// var q = "Lorem ipsum dolor\n sit amet consectetur.\nCras sodales\n imperdiet auctor.";
var q = 'Какой-то умный \n человек \nпридумал\n  SVG\n  и это \nЗБС '
var text = draw.text(q)
	.font({
		family: 'Open Sans',
		size: 36
	}).fill({ color: '#fff' })
text.leading(1.5).move(20, 20);



// get your svg as string
console.log(draw.svg());
