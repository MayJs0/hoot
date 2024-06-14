const { EmbedBuilder } = require('discord.js');
const emojis = require('../../../assets/emojis.json');
module.exports = {
    name: "eval",
    aliases: ['e'],
run: async({client, message, args}) => {
try {
    if (!client.developers.includes(message.author.id)) return message.channel.send(`${emojis.emojis.incorrect} | Só meus devs podem executar este comando!`)
    if (!args[0]) return message.channel.send(`${emojis.emojis.incorrect} | Digite algo antes!`)
    let entrada = args.join(" ");
    let saida = eval(entrada);
    if (saida instanceof Promise) await saida
    if (typeof saida !== "string")
    saida = require("util").inspect(saida, { depth: 0 });
      const embed = new EmbedBuilder()
        .setTitle(`${emojis.emojis.warn} Eval`)
    .setColor('#303136')
    .addFields(
        { name: `${emojis.emojis.join} Entrada:`, value: `\`\`\`js\n${entrada}\`\`\`` },
        { name: `${emojis.emojis.leave} Saída:`, value: `\`\`\`js\n${saida}\`\`\`` }
    )
    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` })
    message.channel.send({ embeds: [embed] });
} catch (err) {
        let entrada = args.join(" ");
    const embed = new EmbedBuilder()
    .setTitle('<:2_smirk:1189391265356333157> Eval')
    .setColor('#303136')
    .addFields(
        { name: `${emojis.emojis.join} Entrada:`, value: `\`\`\`js\n${entrada}\`\`\`` },
        { name: `${emojis.emojis.leave} Saída:`, value: `\`\`\`js\n${err}\`\`\`` }
    )
    .setFooter({ text: `${message.author.tag}`, iconURL: `${message.author.avatarURL()}` })
    message.channel.send({ embeds: [embed] });    
}
}}