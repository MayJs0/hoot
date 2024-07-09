const guilds  = require("../../Schemas/guilds")
const welcome = require('../../assets/canvas/welcomeCanvas')
const Discord = require('discord.js')
const emojis = require('../../assets/emojis.json');
module.exports = {
    name: 'guildMemberAdd',
    run: async (client ,member) => {
    const Guild = await guilds.findOne({ _id: member.guild.id }) || guilds.create({ _id: member.guild.id });
    
    const sla = Guild.welcome
    const channel = Guild.channel
    const arole = Guild.role.r
    const canal = member.guild.channels.cache.get(channel) ?? 'false';
    
    const palavrasChaves = {
      "{member}": member.toString(),
      "{server}": member.guild.name,
      "{channel}": member.guild.rulesChannelId === null ? 'regras' : `<#${member.guild.rulesChannelId}>`,
      "{count}": member.guild.members.cache.size,
    }
    const welcomeMessage = Guild.welcomeMessage ?? `${emojis.emojis.stars} Boas-vindas ao servidor! \n ${emojis.emojis.warn} Leia as nossas {channel} para viver de bem conosco!\n${emojis.emojis.escudo} Precisa de ajuda? Entre em contato com a equipe do servidor!`;
    function substituirPalavras(mensagem, palavrasChaves) {
      return mensagem.replace(
          new RegExp(Object.keys(palavrasChaves).join("|"), "gi"),
          function(matched) {
              return palavrasChaves[matched.toLowerCase()];
          }
      );
  }
  const attachment = new Discord.AttachmentBuilder((await welcome(client, member)).attachment, { name: 'welcome.png' });
  let novaMensagem = substituirPalavras(welcomeMessage, palavrasChaves);
    if(sla === "true" && canal !== 'false') {
      const embed = new Discord.EmbedBuilder()
      .setAuthor({name: member.user.username, iconURL: member.displayAvatarURL()})
      .setTitle(`${emojis.emojis.join} Welcome!`)
      .setDescription(`${novaMensagem}`)
      .setFooter({text: `${member.guild.name} - Welcome message`, iconURL: member.guild.iconURL({dynamic: true})})
      .setImage('attachment://welcome.png')
      .setThumbnail(member.guild.iconURL({dynamic: true}))
      .setColor('#5f9ea0')
      canal.send({
        content: member.toString(),
        embeds: [embed],
        /* TODO I will redesign the image
        files: [attachment]
        */
      })
    }
    if (arole === true) {
      const roleIds = Guild.role.id.split('-');
      roleIds.forEach(roleId => {
        const role = member.guild.roles.cache.get(roleId);
        if (role) {
          member.roles.add(role);
        }
      });
    }
  }
}