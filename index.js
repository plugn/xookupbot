const TelegramBot = require('node-telegram-bot-api');
const url = require('url');
let imgproc = require('./imgproc');
const token = process.env.TBOT_TOKEN || '356629590:AAHbRjFqQ7VnQdezHDrPEOYbjVv_M7UmgD0';
// || require('./.secret/conf.json').api_token;
console.log('tkn ', token);

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

	imgproc(cmd.url, {text: cmd.text}, onImgBuffer, onErrorCallback);

	function onErrorCallback (errMsg) {
		bot.sendMessage(chatId, 'Image processing error.\n'+ errMsg);
	}


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

