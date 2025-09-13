require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [

    {
        name: "rules",
        description: "Sends a list of server rules",
    },

    {
        name: "calculator",
        description: "does simple calculations",
        options: [
            {
                name: "first-number",
                description: "First number in the calculation",
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: "operation",
                description: "Which operator do you want to use",
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {name: "Add (+)", value: "add"},
                    {name: "Subtract (-)", value: "sub"},
                    {name: "Multiply (x)", value: "mul"},
                    {name: "Divide (/)", value: "div"}
                ]
            },
            {
                name: "second-number",
                description: "Second number in the calculation",
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },

    {
        name: "news",
        description: "Sends news from bleeping computer",
    },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log("Registering slash commands...");

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log("Registered commands successfully!");

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
})();