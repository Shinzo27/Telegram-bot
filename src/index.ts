import { Context, Telegraf } from "telegraf";
import axios from "axios";
import { config } from "./config.js";
import User from "./Models/User.js";
import mongoose, { mongo } from "mongoose";

mongoose.connect(config.MONGODB_URI || "").then(() => {console.log("Connected to MongoDB")}).catch((err) => {console.log(err)});

const bot = new Telegraf(config.TOKEN || "");

bot.use(async (ctx: Context, next) => {
    const userId = ctx?.message?.from.id;
    const user = await User.findOne({  userId });

    const message = ctx.message;
    // @ts-ignore
    if (message?.text?.startsWith('/unblock')) {
        return next();
    }
  
    if (user && user.isBlocked === true) {
      return ctx.reply('You are blocked from using this bot.');
    }

    return next();
});

bot.start(async(ctx) => {
    const userId = ctx.message.from.id;
    const user = await User.findOne({ userId });
    if (!user) {
        await User.create({ userId });
        ctx.reply(`Welcome ${ctx.message.from.first_name} to the Telegram Bot!`); 
    } else {
        ctx.reply(`Welcome back ${ctx.message.from.first_name}!`);
    }
});

bot.command('subscribe', async(ctx) => {
    const location = ctx.message.text.split(' ')[1];
    const userId = ctx.message.from.id;

    if(!location) {
        ctx.reply('Please provide a location');
        return;
    }

    await User.findOneAndUpdate({ userId }, { $set: { location } });
    ctx.reply(`You are now subscribed to ${location}`);
});

bot.command('unsubscribe', async(ctx) => {
    const userId = ctx.message.from.id;
    await User.findOneAndUpdate({ userId }, { $set: { location: null } });
    ctx.reply(`You are now unsubscribed from any location`);
});

bot.command('weather', async(ctx) => {
    const userId = ctx.message.from.id;
    const user = await User.findOne({ userId });

    if (!user) {
        ctx.reply('Please subscribe first using /subscribe [city]');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${user.location}&appid=${config.WEATHER_API_KEY}&units=metric`;

    try {
        const response = await axios.get(url);
        const { temp } = response.data.main;
        const description = response.data.weather[0].description;

        ctx.reply(`The temperature in ${user.location} is ${temp}°C and it is ${description}`);
    } catch (error) {
        ctx.reply('Something went wrong');
    }
});

bot.command('block', async(ctx) => {
    const userChatId = ctx.message.text.split(' ')[2];
    console.log(userChatId);
    const adminId = ctx.message.text.split(' ')[1];

    if(!adminId || adminId !== process.env.ADMIN_ID) {
        ctx.reply('You are not authorized to perform this action');
        return;
    }

    if(!userChatId) {
        ctx.reply('Please provide a user chat id using /block [admin id] [user_chat_id]');
        return;
    }

    const user = await User.findOne({ userId: userChatId });
    console.log(user);
    if (!user) {
        ctx.reply('User not found');
        return;
    }
    user.isBlocked = true;
    user.save();
    ctx.reply(`You have blocked ${user.userId}`);
})

bot.command('users', async(ctx) => {
    const adminId = ctx.message.text.split(' ')[1];

    if(!adminId || adminId !== process.env.ADMIN_ID) {
        ctx.reply('You are not authorized to perform this action');
        return;
    }

    const users = await User.find();
    ctx.reply(`Users: ${users.join(', ')}`);
})

bot.command('unblock', async(ctx) => {
    const userChatId = ctx.message.text.split(' ')[2];
    const adminId = ctx.message.text.split(' ')[1];

    if(!adminId || adminId !== config.ADMIN_ID) {
        ctx.reply('You are not authorized to perform this action');
        return;
    }

    if(!userChatId) {
        ctx.reply('Please provide a user chat id using /unblock [admin id] [user_chat_id]');
        return;
    }

    const user = await User.findOne({ userId: userChatId });
    if (!user) {
        ctx.reply('User not found');
        return;
    }

    user.isBlocked = false;
    user.save();
    ctx.reply(`You have unblocked ${ctx.message.from.first_name}`);
})

bot.command('weatherApiKey', async(ctx) => {
    const adminKey = ctx.message.text.split(' ')[1];
    const weatherApiKey = ctx.message.text.split(' ')[2];

    if(!adminKey || adminKey !== config.ADMIN_ID) {
        ctx.reply('You are not authorized to perform this action');
        return;
    }

    if(!weatherApiKey) {
        ctx.reply('Please provide a weather api key using /weatherApiKey [api_key]');
        return;
    }

    config.WEATHER_API_KEY = weatherApiKey;
    ctx.reply(`You have updated the weather api key to ${weatherApiKey}`);
});

bot.command('changeCity', async(ctx) => {
    const userId = ctx.message.from.id;
    const user = await User.findOne({ userId });

    if (!user) {
        ctx.reply('Please subscribe first using /subscribe [city]');
        return;
    }

    const city = ctx.message.text.split(' ')[1];
    if(!city) {
        ctx.reply('Please provide a city using /changeCity [city]');
        return;
    }

    user.location = city;
    user.save();
    ctx.reply(`You have changed the city to ${city}`);
});

bot.launch();