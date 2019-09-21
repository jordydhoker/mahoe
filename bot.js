const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
let isReady = true;

client.on("message", message => {
    if (message.author.username === "MAHOE") {
        return;
    }
    if (message.author.id == 113733053150527497) {
        //fuck kabnaar
        message.reply('zwijg is');
        return;
    }
    if (
        message.content.slice(0, 1) !== "%" ||
        (!isReady && !checkChannel(message))
        ) {
        return;
    }

    const sound = message.content.slice(1);

    if (fs.existsSync('./sounds/' + sound + '.mp3')) {
        const voiceChannel = message.member.voiceChannel;
        console.log('Playing ' + sound + ' for ' + message.author.username + ' in channel ' + message.member.voiceChannel.name);
        joinVoice(voiceChannel, sound);
    }
    else {
        message.reply(sound + ' does not exist');
        console.log(message.author.username + ' tried playing ' + sound);
    }

});


function checkChannel(message) {
    if (!message.member.voiceChannel) {
        message.reply('ga is in ne voicechannel bloten');
        return false;
    }
    return true;
}

function joinVoice(voiceChannel, sound) {
    isReady = false;
    voiceChannel.join().then(connection => {
        setTimeout(play, 1000, connection, sound, voiceChannel);
    }).catch(err => console.log(err));
}

function play(connection, sound, voiceChannel) {
    const dispatcher = connection.playFile('./sounds/' + sound + '.mp3');
    dispatcher.on("end", end => setTimeout(leaveVoice, 1000, voiceChannel));
}

function leaveVoice(voiceChannel) {
    voiceChannel.leave();
    isReady = true;
}

const {token} = require('./auth.json');
client.login(token);

console.log('Running MAHOE')