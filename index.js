const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./.secret/conf.json').api_token; // 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
// bot.setWebHook('public-url.com', {
// 	certificate: 'path/to/crt.pem', // Path to your crt.pem
// })
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
	// 'msg' is the received Message from Telegram
	// 'match' is the result of executing the regexp above on the text content
	// of the message

	const chatId = msg.chat.id;
const resp = match[1]; // the captured "whatever"

// send back the matched "whatever" to the chat
bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
	const chatId = msg.chat.id;
let counter = 0;
// send a message to the chat acknowledging receipt of their message
bot.sendMessage(chatId, 'Received your message #' + JSON.stringify(msg) + 'chatId:' + chatId);
});