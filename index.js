const _ = require('lodash')
const TelegramBot = require('node-telegram-bot-api');
const url = require('url');
let imgproc = require('./imgproc');
const token = process.env.TBOT_TOKEN;
// || '980144418:AAFZzdcuFo7OY54jCcIlgfwYry0bPvMBHXs';
// const token = require('./.secret/conf.json').api_token;
console.log('tkn ', token);
let userText = 'Hola'
let userColor = '#222222'
let userSize = 36
let userGravity = 'northwest'
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	const msgText = msg.text;
	// send a message to the chat acknowledging receipt of their message
	if (msgText && msgText.indexOf('\/') === -1) {
		bot.sendMessage(chatId, 'Received text: ' + msgText)
		userText = msgText;
	}
	const attachmentType = ['document', 'photo'].find(v => msg.hasOwnProperty(v))
	const attachment = attachmentType && msg[attachmentType]
  if (attachment) {
		console.log('type', attachmentType, 'attachment: ',  attachment);
		bot.getFileLink(attachment[attachment.length-1].file_id).then(fileLink => {
			console.log('fileLink', fileLink)
			imgproc(fileLink, {text: userText, color: userColor, size: userSize, gravity: userGravity}, onImgBuffer, onErrorCallback);
		})
	}
	// console.log('msg', JSON.stringify(msg));

	function onImgBuffer(outputBuffer) {
		bot.sendSticker(chatId, outputBuffer);
	}

	function onErrorCallback (errMsg) {
		bot.sendMessage(chatId, 'Image processing error.\n'+ errMsg);
	}


});

const CHOOSE_GRAVITY = 'Choose gravity:'
bot.onText(/\/gravity/, function (msg, match) {
	console.log('onText \/size', msg.text)
	const options = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{ text: 'NW', callback_data: 'northwest' }],
				[{ text: 'NE', callback_data: 'northeast' }],
				[{ text: 'SW', callback_data: 'southwest' }],
				[{ text: 'SE', callback_data: 'southeast' }],
			]
		})
	};

	bot.sendMessage(msg.chat.id, CHOOSE_GRAVITY, options);

})



const CHOOSE_SIZE = 'Choose font size:'
bot.onText(/\/size/, function (msg, match) {
	console.log('onText \/size', msg.text)
	const options = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{ text: '24', callback_data: '24' }],
				[{ text: '36', callback_data: '36' }],
				[{ text: '48', callback_data: '48' }],
				[{ text: '60', callback_data: '60' }],
				[{ text: '72', callback_data: '72' }],
				[{ text: '84', callback_data: '84' }],
				[{ text: '96', callback_data: '96' }],
			]
		})
	};

	bot.sendMessage(msg.chat.id, CHOOSE_SIZE, options);

})

const CHOOSE_COLOR = 'Choose color:'
bot.onText(/\/color/, function (msg, match) {

	const options = {
		reply_markup: JSON.stringify({
			inline_keyboard: [
				[{ text: 'light', callback_data: '#eeeeee' }],
				[{ text: 'dark', callback_data: '#222222' }],
				[{ text: 'red', callback_data: '#e00' }],
				[{ text: 'green', callback_data: '#0e0' }],
				[{ text: 'blue', callback_data: '#00e' }],
				[{ text: 'orange', callback_data: 'orange' }],
				[{ text: 'gray', callback_data: '#888' }],
				[{ text: 'lightgray', callback_data: '#ccc' }],
			]
		})
	};

	bot.sendMessage(msg.chat.id, CHOOSE_COLOR, options);

	// console.log(' = match: ', match)
	// colorDialog.then(value => {
	// 	console.log(' * colorDialog', value)
	// })

})

// Handle callback queries
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
	const data = callbackQuery.data;
	const msg = callbackQuery.message;
	const opts = {
		chat_id: msg.chat.id,
		message_id: msg.message_id,
	};

	console.log(' * callbackQuery', (callbackQuery))

	if (msg.text === CHOOSE_COLOR) {
		userColor = data
	}
	if (msg.text === CHOOSE_SIZE) {
		userSize = data
	}
	if (msg.text === CHOOSE_GRAVITY) {
		userGravity = data
	}
	bot.sendMessage(msg.chat.id, 'you choose: ' + data);
});



/*
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

 */