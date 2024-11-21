import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();

const token = process.env.TOKEN || "";
const bot = new TelegramBot(token, { polling: true });
  
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to my bot! Use /help to see available commands.');
});
  
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Here are some commands you can try:\n/start - Welcome message\n/help - List of commands');
});