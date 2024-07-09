const Discord = require('discord.js');
const emojis = require('../../../assets/emojis.json');
module.exports = {
    name: "icon",
    description: "｢Utility｣ Visualize the server icon",
    requiredDb: true,
    type: Discord.ApplicationCommandOptionType.Subcommand,
    options: [{
        name: "server",
        description: "｢Utility｣ Visualize the server icon!",
        type: 1,
        required: false
    }],
    run: async({client, interaction, userdb}) => {
        const userLang = userdb.language;
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.stars} | ${userLang === 'en' ? `Server Icon ${interaction.guild.name}` : `Ícone do servidor ${interaction.guild.name}`}`)
        .setDescription(`${emojis.emojis.download} | ${userLang === 'en' ? `Click [here](${interaction.guild.iconURL({extension: 'png', size: 2048 })}) to download the image!` : `Clique [aqui](${interaction.guild.iconURL({extension: 'png', size: 2048 })}) para baixar a imagem!`}`)
        .setColor('#5f9ea0')
        .setFooter({text: `${userLang === 'en' ? `Executed by ${interaction.user.username}` : `Executado por ${interaction.user.username}`}`, iconURL: interaction.user.displayAvatarURL()})
        .setImage(interaction.guild.iconURL({extension: 'png', size: 2048 }))
        
        interaction.reply({
            embeds: [embed]
        })
    }
}