const Discord = require("discord.js");
const guilds = require("../../Schemas/guilds");
module.exports = {
    name: "panel",
    authorOnly: true,
    execute: async ({client, interaction, args}) => {
        const values = interaction.values[0]
        // TODO Finalizar isto amanhã
    }
}