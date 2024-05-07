const { Bot, session  } = require("grammy");
const { conversations, createConversation } = require("@grammyjs/conversations");
require('dotenv').config()

const bot = new Bot(process.env.MPTLECTUTES);

async function greeting(conversation, ctx) {
    await ctx.reply("Hi there! What is your name?");
    const { message } = await conversation.wait();
    await ctx.reply(`Welcome to the chat, ${message.text}!`);
}

// Install the session plugin.
bot.use(session({
    initial() {
      // return empty object for now
      return {};
    },
}));
  
  // Install the conversations plugin.
bot.use(conversations());

bot.use(createConversation(greeting));

bot.command("start", async (ctx) => {
    await ctx.conversation.enter("greeting");
});

bot.start();