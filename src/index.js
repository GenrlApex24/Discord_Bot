require("dotenv").config();
const {Client, IntentsBitField} = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on("clientReady", (c) => {
    console.log(`✅ The bot is ready. ${c.user.username}`);
});

client.on("messageCreate", (msg) => {
    if (msg.author.bot){
        return;
    }

    if (msg.content == "hello"){
        msg.reply("Heyy, welcome to the server")
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChannelSelectMenu()){
        if (interaction.commandName === "hey"){
            interaction.reply("Hello, how are you today")
        }

        if (interaction.commandName === "ping"){
            interaction.reply("Pong!")
        }
    }
});

client.login(process.env.TOKEN);