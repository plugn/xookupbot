const sharp = require('sharp');
// const fs = require("fs");
// const path = require('path');

sharp('_img/HLV3.svg')
	// .resize(300, 200)
	.toFile('_img/HLV3.png', function(err) {
	});
