const User = require("../../Schemas/user");
const emojis = require("../../assets/emojis.json");
const Discord = require("discord.js");
module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        const userdb = await User.findById(interaction.user.id);
        if (interaction.type === Discord.InteractionType.ApplicationCommand) {
            const cmd = client.slashCommands.get(interaction.commandName);
            if (!cmd) return interaction.reply(`Error`);
            interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
            //cmd.run(client, interaction)
            const user = interaction.options.getUser('user') || interaction.user;
            const mentionDb =  await User.findById(user?.id);
            const authorDb = await User.findById(interaction.user.id);
          
            if ((!authorDb && cmd?.requiredDb) && interaction.commandName !== 'registrar') return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, you are not registered in my database. Use </register:1250629036783173654> to register!`);
            
            if ((!mentionDb && user) && cmd?.requiredDb) return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, the user **${user.username}** is not registered in my database!`);
            try {
                if(cmd) {
                    cmd.run({client, interaction, userdb})
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
}