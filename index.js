const TelegramBot = require('node-telegram-bot-api');

const dialogflow = require('./dialog-flow');

const token = '######################'

const youtube = require('./youtube');

const bot = new TelegramBot(token, {polling:true});



bot.on('message', async function(msg){
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfresponse = await dialogflow.sendMessage(chatId.toString(), msg.text)
    
    let responseText = dfresponse.text;
    if(dfresponse.intent === 'treino especifico'){
        responseText = await youtube.searchVideoUrl(responseText, dfresponse.fields.corpo.stringValue)
    }

    bot.sendMessage(chatId, responseText)
})