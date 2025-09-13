require("dotenv").config();
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const {Client, IntentsBitField} = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

const roles = [
    {
        id: process.env.RED_ROLE_ID,
        label: "red"
    },
    {
        id: process.env.GREEN_ROLE_ID,
        label: "green"
    },
    {
        id: process.env.BLUE_ROLE_ID,
        label: "blue"
    },
]


client.on("clientReady", async (c) => {
    try {
        const channel = await client.channels.cache.get(process.env.CHANNEL_ID);
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.label)
                    .setStyle(ButtonStyle.Secondary)
            )
        });

    await channel.send({
        content: "**Claim your roles bellow!**",
        components: [row]
    });

    process.exit();

    } catch (error) {
        console.log(`You got an error: ${error}`);
    }
});

client.login(process.env.TOKEN);