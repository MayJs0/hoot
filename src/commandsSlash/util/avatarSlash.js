const Discord = require('discord.js');
const emojis = require('../../../assets/emojis.json');
module.exports = {
    name: "avatar",
    description: "｢Utility｣ Vizualize your avatar!",
    type: 1,
    options: [{
        name: "user",
        description: "Select a user",
        type: 6,
        required: false
    }],
    run: async({client, interaction, userdb}) => {
        const userLang = userdb.language;
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.stars} | ${userLang === 'en' ? `Avatar of ${user.username}` : `Avatar de ${user.username}`}`)
        .setDescription(`${emojis.emojis.download} | ${userLang === 'en' ? `Click [here](${user.displayAvatarURL({type: 'jpg', size: 1024 })}) to download the image!` : `Clique [aqui](${user.displayAvatarURL({type: 'jpg', size: 1024 })}) para baixar a imagem!`}`)
        .setColor('#5f9ea0')
        .setFooter({text: `${userLang === 'en' ? `Executed by ${interaction.user.username}` : `Executado por ${interaction.user.username}`}`, iconURL: interaction.user.displayAvatarURL()})
        .setImage(user.displayAvatarURL({type: 'jpg', size: 1024 }))
        
        interaction.reply({
            embeds: [embed]
        })
    }
}