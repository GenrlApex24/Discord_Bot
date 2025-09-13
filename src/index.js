require("dotenv").config();
const { EmbedBuilder } = require("discord.js");
const {Client, IntentsBitField} = require("discord.js");
let Parser = require("rss-parser");

let parser = new Parser();

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
        msg.reply("Heyyyyy!!")
    }
});


client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()){

        if (interaction.commandName === "calculator"){
            const num1 = interaction.options.get("first-number").value;
            const num2 = interaction.options.get("second-number").value;
            const operator = interaction.options.get("operation").value;

            if (operator === "add"){
                interaction.reply(`${num1} + ${num2} = ${num1 + num2} :)`);
            } else if (operator === "sub") {
                interaction.reply(`${num1} - ${num2} = ${num1 - num2} :)`);
            } else if (operator === "mul") {
                interaction.reply(`${num1} x ${num2} = ${num1 * num2} :)`);
            } else if (operator === "div") {
                interaction.reply(`${num1} / ${num2} = ${num1 / num2} :)`);
            }
        }

        if (interaction.commandName === "news"){
            try{
                let feed = await parser.parseURL("https://www.bleepingcomputer.com/feed/");
        
                await interaction.reply("Here is todays news stories!");
            
                feed.items.slice(0, 5).forEach(item => {
                    interaction.followUp(`${item.title} \n${item.content} \n${item.link} \n\n`)
                })
            
            } catch (err) {
                interaction.reply("Failed to get news! please try again or contact the bots administrator");
            }
        }
    
        if (interaction.commandName === "rules"){
            const embed = new EmbedBuilder()
                .setTitle("Welcome to the server!")
                .setDescription("We hope you enjoy your time here")
                .setColor("Random")
                .addFields([
                    {
                        name: "**Rules - please read before messaging**",
                        value: "-**Always** be kind but never fail to be nice\n-**NO** doxxing or using personal information\n-**NO** spamming outside of spam channels\n-**NO** homophobia, rasicm or harassment of any kind\n-**NO** offensive images or videos",
                        inline: true,
                    },
                    {
                        name: "**Have fun, be fun**",
                        value: "make sure you and everyone else are having fun, **EVERYONE IS A PERSON**",
                        inline: true,
                    },
                    {
                        name: "**Problems**",
                        value: "If you have any issues with the server or the people in it use our reporting system",
                    }
                ]);

            interaction.reply({ embeds: [embed] });
        }
    } else if (interaction.isButton()){
        try {
            await interaction.deferReply({ ephemeral: true });

            const role = interaction.guild.roles.cache.get(interaction.customId);
            if (!role){
                interaction.editReply({
                    content: "I couldn't find that role",
                })
                return;
            }

            const hasRole = interaction.member.roles.cache.has(role.id);

            if (hasRole) {
                await interaction.member.roles.remove(role);
                await interaction.editReply(`The role ${role} has been removed.`);
            } else {
                await interaction.member.roles.add(role);
                await interaction.editReply(`The role ${role} has been added.`);
            }


        } catch (error) {
            console.log(`You got an error: ${error}`)
        }
    } 
});

client.login(process.env.TOKEN);