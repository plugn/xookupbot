const TelegramBot = require('node-telegram-bot-api');
const Jimp = require("jimp");
const url = require('url');
const PNG = require("pngjs").PNG;
const JPEG = require("jpeg-js");
const svg2png = require('svg2png');
const FS = require("pn/fs");


/*

FS.readFile('_img/media-queries.svg')
	.then(svg2png)
	.then(function (buffer) {
		FS.writeFile('_img/mq.png', buffer)
			.then(data => console.log('data: ', data))
			.catch(e => console.error(e))
	})
	.catch(e => console.error(e));
*/


// replace the value below with the Telegram token you receive from @BotFather
const token = require('./.secret/conf.json').api_token; // 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;

	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, 'Received your message #' + JSON.stringify(msg) + 'chatId:' + chatId);

	let fontL = Jimp.FONT_SANS_64_WHITE;
	let fontB = Jimp.FONT_SANS_64_BLACK;
	let cmd = parseReq(msg.text);
	let cmdObj;
	try {
		cmdObj = JSON.parse(cmd);
	} catch (e) {
		cmdObj = {}
	}

	let svgURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Example.svg/1200px-Example.svg.png';



	Jimp.read(cmd.url).then(function (image) {

		Jimp.loadFont( fontB ).then(function (font) { // load font from .fnt file
			// image.greyscale();
			// image.print(font, x, y, str);        // print a message on an image
			image.print(font, 50, 50, cmd.text, 400); // print a message on an image with text wrapped at width
			image.getBuffer(Jimp.MIME_PNG, function(err, buf){
				console.log('buf PNG', buf);

				// bot.sendSticker(chatId, svgURL);
				let options = {emoji: cmdObj.emoji || ''};
				console.log('options: ', options);
				
				bot.sendSticker(chatId, buf, options);
			}); // save
			// image.getBuffer(Jimp.MIME_PNG, onBuffer);



		});

	}).catch(function (err) {
		bot.sendMessage(chatId, ' НЕ ОСИЛИЛ: ', msg.text);
		console.error('Jimp error', err);
	});
});
let imgUrlDefault = "https://upload.wikimedia.org/wikipedia/commons/0/01/Bot-Test.jpg";
function parseReq(msg) {
	if (!msg) { return; }
	let text = msg;
	let rows = msg.split("\n");
	let urlObj = rows.length && url.parse(rows[0]);
	let imgUrl = imgUrlDefault;
	if (urlObj.protocol && urlObj.href) {
		imgUrl = urlObj.href;
		text = rows.slice(1).join("\n");
	}
	let result = {url: imgUrl, text: text};
	console.log('result', result);
	return result;
}

