const TelegramBot = require('node-telegram-bot-api');
const Jimp = require("jimp");
const url = require('url');
const PNG = require("pngjs").PNG;
const JPEG = require("jpeg-js");
const svg2png = require('svg2png');
const FS = require("pn/fs");
let imgproc = require('./imgproc');

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./.secret/conf.json').api_token; // 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	const msgText = msg.text;

	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, 'Received '+ (msgText));

	function onImgBuffer(outputBuffer) {
		bot.sendSticker(chatId, outputBuffer);
	}
	let cmd = parseReq(msgText);

	imgproc(cmd.url, {text: cmd.text}, onImgBuffer);


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

console.log('parseReq() ', result);

	return result;
}

