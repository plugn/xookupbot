const svg2png = require('svg2png');
const FS = require("pn/fs");
var Request = require('request').defaults({ encoding: null });

let svgURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Example.svg/1200px-Example.svg.png';
// FS.readFile('_img/media-queries.svg')

FS.readFile(svgURL)
	.then(svg2png)
	.then(function (buffer) {
		FS.writeFile('_img/mq.png', buffer)
			.then(data => console.log('data: ', data))
			.catch(e => console.error(e))
	})
	.catch(e => console.error(e));
