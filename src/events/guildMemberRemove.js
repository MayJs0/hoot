const Discord = require('discord.js');
const guilds = require('../../Schemas/guilds');
const emojis = require('../../assets/emojis.json');
module.exports = {
    name: 'guildMemberRemove',
    run: async (client ,member) => {
        const Guild = await guilds.findOne({ _id: member.guild.id }) || guilds.create({ _id: member.guild.id });
    
        const sla = Guild.welcome
        const channel = Guild.channel
        const canal = member.guild.channels.cache.get(channel) ?? 'false';

        const palavrasChaves = {
          "{member}": member.user.username,
          "{server}": member.guild.name,
          "{count}": member.guild.members.cache.size,
        }
        const leaveMessage = Guild.leaveMessage ?? `👋 | **{member}** saiu do nosso servidor! Espero que um dia ele volte para se divertir conosco novamente!`;
        function substituirPalavras(mensagem, palavrasChaves) {
          return mensagem.replace(
              new RegExp(Object.keys(palavrasChaves).join("|"), "gi"),
              function(matched) {
                  return palavrasChaves[matched.toLowerCase()];
              }
          );
      }
        let novaMensagem = substituirPalavras(leaveMessage, palavrasChaves);
        if(sla === "true" && canal !== 'false') {
          const embed = new Discord.EmbedBuilder()
          .setAuthor({name: member.user.username, iconURL: member.displayAvatarURL()})
          .setTitle(`${emojis.emojis.leave} Goodbye!`)
          .setDescription(`${novaMensagem}`)
          .setFooter({text: `${member.guild.name} - Exit message`, iconURL: member.guild.iconURL({dynamic: true})})
          .setColor('#5f9ea0')
          canal.send({
            embeds: [embed],
          })
        }
    }
}