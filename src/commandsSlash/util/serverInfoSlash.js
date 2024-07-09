const Discord = require('discord.js');
const emojis = require("../../../assets/emojis.json");
module.exports = {
    name: 'server',
    description: "｢Utility｣ Visualize information about the server",
    type: Discord.ApplicationCommandOptionType.Subcommand,
    options: [{
        name: 'info',
        description: "｢Utility｣ Visualize information about the server!",
        type: 1,
    }],
    run: async({client,interaction, userdb}) => {
        const owner = interaction.guild.members.cache.get(interaction.guild.ownerId).user;
        const userLang = userdb?.language ?? 'br';
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.list} | ${userLang === 'en' ? `Information of ${interaction.guild.name}` : `Informações de ${interaction.guild.name}`}`)
        .setDescription(`${interaction.guild.description == null ? `${userLang === 'en' ? "No description defined" : 'Nenhuma descrição definida'}` : interaction.guild.description}`)
        .addFields(
            {name: `${emojis.emojis.verified} ${userLang === 'en' ? 'Server ID' : 'ID do servidor'}`, value: `\`${interaction.guild.id}\``, inline: true},
            {name: `${emojis.emojis.user} ${userLang === 'en' ? 'Server owner' : 'Dono do servidor'}`, value: `\`${owner.username}\` (\`${owner.id}\`)`, inline: true},
            {name: `${emojis.emojis.calendar} ${userLang === 'en' ? "Creation date" : 'Data de criação'}`, value: `<t:${parseInt(interaction.guild.createdAt / 1000)}:D>`, inline: true},
            {name: `${emojis.emojis.list2} ${userLang === 'en' ? 'Rules channel' : 'Canal de regras'}`, value: `**${interaction.guild.rulesChannel == null ? `${userLang === 'en' ? 'No defined' : 'Nenhum definido'}` : interaction.guild.rulesChannel}**`, inline: true},
            {name: `${emojis.emojis.members} ${userLang === 'en' ? 'Members' : 'Membros'} `, value: `**${interaction.guild.members.cache.size}** ${userLang === 'en' ? 'total members' : 'membros totais'}`, inline: true},
            {name: `${emojis.emojis.bot} Apps `, value: `**${interaction.guild.members.cache.filter(member => member.user.bot).size}** ${userLang === 'en' ? 'total apps' : 'apps totais'}`, inline: true},
            {name: `${emojis.emojis.forum} ${userLang === 'en' ? 'Channels' : 'Canais'} `, value: `**${interaction.guild.channels.cache.size}** ${userLang === 'en' ? 'total channels' : 'canais totais'}`, inline: true},
            {name: `${emojis.emojis.anonime} ${userLang === 'en' ? 'Roles': 'Cargos'} `, value: `**${interaction.guild.roles.cache.size}** ${userLang === 'en' ? 'total roles' : 'cargos totais'}`, inline: true},
            {name: `${emojis.emojis.stars} ${userLang === 'en' ? 'Boosts' : 'Impulsos'}`, value: `**${interaction.guild.premiumSubscriptionCount}** ${userLang === 'en' ? 'total boosts' : 'impulsos totais'}`, inline: true},
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setColor('#5f9ea0')
        .setFooter({text: `${userLang === 'en' ? `Executed by ${interaction.user.username}` : `Executado por ${interaction.user.username}`}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        interaction.reply({
            embeds: [embed]
        })
    }
}