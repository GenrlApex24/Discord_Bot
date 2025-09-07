require("dotenv").config();
const {Client, IntentsBitField} = require("discord.js");
let Parser = require("rss-parser");

let parser = new Parser();

function get_news(){
    (async () => {
        let feed = await parser.parseURL("https://www.bleepingcomputer.com/feed/");
        console.log(feed.title);

        feed.items.forEach(item => {
            console.log(`${item.title}: ${item.link}`)
        });
    })();
};

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

        if (interaction.commandName === "news"){
            (async () => {
                try{
                    let feed = await parser.parseURL("https://www.bleepingcomputer.com/feed/");
            
                    await interaction.reply("Here is todays news stories!");
                
                    feed.items.slice(0, 5).forEach(item => {
                        interaction.followUp(`${item.title} \n${item.content} \n${item.link} \n\n`)
                    })
                
                } catch (err) {
                    interaction.reply("Failed to get news! please try again or contact the bots administrator");
                }
            })();
        }
    }
});

client.login(process.env.TOKEN);