const guilds = require("../../Schemas/guilds");
const User = require("../../Schemas/user");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    
    if (message.channel.type === 1)
  return;
    const guilddb = await guilds.findOne({ _id: message.guild.id }) || await guilds.create({ _id: message.guild.id });
    if (message.author.bot) return;

    const prefix = guilddb.prefix;

    if (message.content.replace("!", "") === `<@${client.user.id}>`)
      return message.reply(
        `<:hoot:1250444495674277928> | Olá ${message.author}, tudo bem? Meu prefixo neste servidor é \`${prefix}\` utilize \`${prefix}help\` para obter ajuda! `
      );

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift()?.toLowerCase();
    const cmd = client.commands.find((c) => c.name === command || c.aliases && c.aliases.includes(command))

    if (!cmd) return;

    const mentions = message.mentions.users.first()
    const user = mentions || client.users.cache.find((u) => args.some((a) => a === u.id || a === u.username));

    const mentionDb =  await User.findById(user?.id);
    const authorDb = await User.findById(message.author.id);

    if ((!authorDb && cmd?.requiredDb) && command !== 'registrar')
    return message.channel.send(`<:avisos:1194279514990198886> | ${message.author}, você não está registrado no meu banco de dados. Use **${prefix}registrar** para se registrar!`);
  
    if ((!mentionDb && user) && cmd?.requiredDb)
    return message.channel.send(`<:avisos:1194279514990198886> | ${message.author}, o usuário **${user.username}** não está registrado em meu banco de dados!`);
try {
    if(cmd) {
        cmd.run(client, message, args)
        }
    } catch (err) {
      console.log(err);
    }
  },
}