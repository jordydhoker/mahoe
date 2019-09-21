const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

let isReady = true;

client.on("message", async message => {
    const state = {
        message,
        sound: message.content.slice(1),
        voiceChannel: message.member.voiceChannel
    };

    if (!canRun(state)) return;

    isReady = false;
    await run(state);
    isReady = true;
});

function canRun({ message, ...state }) {
    //bot wont run if this returns false
    if (
        message.author.id === 509464429037879323 || //if is mahoebot
        message.content.slice(0, 1) !== "%" || //if message does not begin with '%'
        !isReady
    ) {
        return false;
    }

    if (!state.voiceChannel) {
        message.reply("ga is in ne voicechannel bloten");
        return false;
    }

    if (!fs.existsSync("./sounds/" + state.sound + ".mp3")) {
        message.reply(state.sound + " does not exist");
        return false;
    }

    if (message.author.id === 113733053150527497) {
        //fuck kabnaar
        message.reply("zwijg is");
        return false;
    }

    return true;
}

async function run(state) {
    try {
        const connection = await state.voiceChannel.join();
        connection
            .playFile("./sounds/" + state.sound + ".mp3")
            .on("end", () => setTimeout(() => state.voiceChannel.leave(), 1000));
    } catch (err) {
        state.message.reply("Zeg tegen <@119523208192983045> da er een error is");
        console.log(err);
    }
}

const { token } = require("./auth.json");
client.login(token);

console.log("Running MAHOE");
