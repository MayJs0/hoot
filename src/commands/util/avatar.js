const Discord = require('discord.js');
const emojis = require('../../../assets/emojis.json');
module.exports = {
    name: "avatar",
    type: 1,
    run: async({client, message, authorDb, args}) => {
        const userLang = authorDb.language;
        const user = message.mentions.users.first() || (await client.users.fetch(args[0]).catch(() => {})) || message.author;
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.stars} | ${userLang === 'en' ? `Avatar of ${user.username}` : `Avatar de ${user.username}`}`)
        .setDescription(`${emojis.emojis.download} | ${userLang === 'en' ? `Click [here](${user.displayAvatarURL({type: 'jpg', size: 1024 })}) to download the image!` : `Clique [aqui](${user.displayAvatarURL({type: 'jpg', size: 1024 })}) para baixar a imagem!`}`)
        .setColor('#5f9ea0')
        .setFooter({text: `${userLang === 'en' ? `Executed by ${message.author.username}` : `Executado por ${message.author.username}`}`, iconURL: message.author.displayAvatarURL()})
        .setImage(user.displayAvatarURL({type: 'jpg', size: 1024 }))
        
        message.reply({
            embeds: [embed]
        })
    }
}