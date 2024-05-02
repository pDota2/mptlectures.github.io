require('dotenv').config()
const { generateUpdateMiddleware } = require("telegraf-middleware-console-time") 

const { Bot, InlineKeyboard } = require('grammy')

const bot = new Bot(process.env.True_TOKEN)


bot.use(generateUpdateMiddleware())
bot.api.setMyCommands([
    {
        command: "start", description: "Начальная команда",
    },
    {
        command: "queue_start", description: "Запустить очередь",
    }
])

bot.command('start', async (ctx) => {
    await ctx.reply("Привет!❤️\nЭто бот в котором будут собраны лекции 2 курса📚, а так он способен создавать очереди, на сдачу каких либо работ!)")
})

bot.command("queue_start", async (ctx) => {
    const queueKeyboard = new InlineKeyboard()
    .text("Текущая очередь: \n", "q#join")
    await ctx.reply('Давайте создадим очередь: ', {
        reply_markup: queueKeyboard,
    })
})

bot.callbackQuery('q#join', async (ctx) => {
    await ctx.answerCallbackQuery({
        text: "Вы вступили в очередь",
    })

    const queueKeyboard = new InlineKeyboard()
    .text("Текущая очередь: \n", "q#join")

    const newText = `${ctx.callbackQuery.message.text}\n${ctx.callbackQuery.message.text.split('\n').length}. @${ctx.callbackQuery.message.chat.username}`

    await ctx.editMessageText(newText, {
        reply_markup: queueKeyboard,
    })

    console.log(ctx.callbackQuery)
})

bot.start()
