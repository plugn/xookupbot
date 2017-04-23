const TelegramBot = require('node-telegram-bot-api');
const Jimp = require("jimp");
const url = require('url');
const PNG = require("pngjs").PNG;
const JPEG = require("jpeg-js");
var FS = require("fs");
var MIME = require("mime");
var FileType = require("file-type");

// replace the value below with the Telegram token you receive from @BotFather
const token = require('./.secret/conf.json').api_token; // 'YOUR_TELEGRAM_BOT_TOKEN';
// if (data instanceof stream.Stream) {}
function getMIMEFromBuffer(buffer, path) {
	var fileTypeFromBuffer = FileType(buffer);
	if (fileTypeFromBuffer) {
		// If FileType returns something for buffer, then return the mime given
		return fileTypeFromBuffer.mime;
	}
	else if (path) {
		// If a path is supplied, and FileType yields no results, then retry with MIME
		// Path can be either a file path or a url
		return MIME.lookup(path)
	} else {
		return null;
	}
}


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
let imgUrlDefault = "https://upload.wikimedia.org/wikipedia/commons/0/01/Bot-Test.jpg";



bot.on('message', (msg) => {
	let chatId = msg.chat.id;


	Jimp.read(imgUrlDefault).then(function (image) {

		Jimp.loadFont( Jimp.FONT_SANS_64_WHITE )
		.then(function (font) {
			//let image = img.resize(256, 256);            // resize

			// image.print(font, 50, 50, 'LOUD', 400);
			image.getBuffer(Jimp.MIME_PNG , function(err, buf){
				var stream = FS.createWriteStream('MYIMAGE.png');
				stream.on("open", function(fh) {
					// stream.write(buf);
					bot.sendPhoto(chatId, stream)
					stream.end();

				}).on("error", function(err) {
					return throwError.call(that, err, cb);
				});
				stream.on("finish", function(fh) {
					let mime = getMIMEFromBuffer(buf);
					stream.end();

					console.log('buf PNG mime:',mime, 'buf:', buf);
					//bot.sendPhoto(chatId, stream);
					//return cb.call(that, null, that);
				});




			});

			// image.getBuffer(Jimp.MIME_JPEG , function(err, buf){
			// 	let mime = getMIMEFromBuffer(buf);
			// 	console.log('buf JPEG mime:', mime, 'buf:', buf);
			//
			// });
		});
	}).catch(function (err) {
		console.error('Jimp.read() catch err', err);
	});
});

bot.on('channel_post', (msg) => {
	let chatId = msg.chat.id;

	// send a message to the chat acknowledging receipt of their message
	bot.sendMessage(chatId, 'Received your message #' + JSON.stringify(msg) + 'chatId:' + chatId);

	let fontL = Jimp.FONT_SANS_64_WHITE;
	let cmd = parseReq(msg.text);
	Jimp.read(cmd.url).then(function (image) {

		function onBuffer(err, buffer) {
			if (err) throw err;
			console.log('onBuffer', buffer);
			bot.sendPhoto(chatId, buffer);
		}

		Jimp.loadFont( fontL ).then(function (font) { // load font from .fnt file
			image.greyscale();
			// image.print(font, x, y, str);        // print a message on an image
			image.print(font, 50, 50, cmd.text, 400); // print a message on an image with text wrapped at width
			image.getBuffer(Jimp.MIME_PNG , function(err, buf){
				console.log('buf PNG', buf);
				bot.sendPhoto(chatId, buf);
			}); // save
			// image.getBuffer(Jimp.MIME_PNG, onBuffer);



		});

	}).catch(function (err) {
		bot.sendMessage(chatId, ' НЕ ОСИЛИЛ: ', msg.text);
		console.error('Jimp error', err);
	});
});
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
