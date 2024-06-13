const Discord = require('discord.js');
const User = require("../../../Schemas/user");
module.exports = {
    name: 'register',
    description: "｢Utility｣ Register in my system",
    type: 1,
    run: async(client, interaction) => {
        const userdb = await User.findById(interaction.user.id);
        if(userdb) return interaction.reply(`<:positivo:1187942059554918511> | ${interaction.user}, você já está registrado no banco de dados!`)
        const embed = new Discord.EmbedBuilder()
        .setTitle('<:verifiedd:1233961707773235201> Registrado(a) uwu')
        .addFields(
            {name: "Parabéns 🎉", value: `${interaction.user}, você foi registrado(a) com sucesso no meu banco de dados!`,inline: true},
            {name: 'Desfrute dos meus comandos 💫', value: `Agora você pode utilizar **todas** as minhas funcionalidades sem se preocupar! owo`,inline: true},
            {name: 'Leia os termos abaixo <:bookk:1214388072209449020>', value: `Você deve ler os meus **termos** para evitar confusões futuras e acabar sendo banido do meu sistema!`,inline: true},
            )
        .setColor('00EE00')
        .setThumbnail('https://cdn.discordapp.com/attachments/1187881183611207850/1216383541357576213/database.png?ex=66003073&is=65edbb73&hm=17271b57d3a9b702888e9d8e4bbe89503dacba795d066c5dd3cbf20683003a98&')
        .setFooter({text: `Registro de ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`});

        const botao = new Discord.ButtonBuilder()
        .setEmoji('<:bookk:1214388072209449020>')
        .setLabel('Termos')
        .setStyle(Discord.ButtonStyle.Link)
        .setURL('https://jullywebsite.squareweb.app/paginas/termos/termos.html');
        const row = new Discord.ActionRowBuilder().addComponents(botao);
        interaction.reply({embeds: [embed], components: [row]})
        await User.create({_id: interaction.user.id});
        await Userafk.create({_id: interaction.user.id});
        const channel =  client.channels.cache.get('1196953927321665646');
        const embedlogs = new Discord.EmbedBuilder()
          .setTitle("👩‍💻 | LOGS JULLY")
          .addFields(
            {name: "Novo registro", value: `<t:${parseInt(Date.now() / 1000)}:d>`},
            {name: "Usuário", value: `${interaction.user.tag} (${interaction.user.id})`},
            {name: "Conta criada", value: `<t:${parseInt(interaction.user.createdTimestamp / 1000)}:D>`},
            {name: "Servidor", value: `${interaction.guild.name}(${interaction.guild.id})`}
          )
          .setColor("00FF00");
          channel.send({embeds: [embedlogs]})
    }
    
}