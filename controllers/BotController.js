const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('6771558902:AAG0Mmgx17sa-e1ln-VYYHeenvLrCwbvbgs', { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const messageText = msg.text
  bot.sendMessage(chatId, 'Здравствуйте! Это бот заявок с сайта Инносфера.')
})

class BotContoller {
    async send(req, res, next) {
        try {
            const {name, phone, message} = req.body
            const text = `❗*НОВАЯ ЗАЯВКА*❗\n\nИмя: ${name}\nТелефон: ${phone}\n${message ? 'Сообщение:' : ''} ${message}`
            bot.sendMessage(525881782, text, {parse_mode: "Markdown"})
            return res.json(text)
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BotContoller()