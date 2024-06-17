const guilds = require("../../Schemas/guilds");
const User = require("../../Schemas/user");
const emojis = require('../../assets/emojis.json')
module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.channel.type === 1)
  return;
    const guilddb = await guilds.findOne({ _id: message.guild.id }) || await guilds.create({ _id: message.guild.id });
    if (message.author.bot) return;
    const authorDb = await User.findById(message.author.id);
    const prefix = guilddb.prefix;
    const lang = authorDb?.language ?? 'br';
    const text = {
      br: {
        messageSend: `${emojis.emojis.hoot} | Olá ${message.author}, tudo bem? Meu prefixo neste servidor é \`${prefix}\` utilize \`${prefix}help\` para obter ajuda! \n${emojis.emojis.world} | Use </set language:1250617213891907616> para alterar meu idioma com você!`
      },
      en: {
        messageSend: `${emojis.emojis.hoot} | Hello ${message.author}, how are you? My prefix in this server is \`${prefix}\` use \`${prefix}help\` to get help! \n${emojis.emojis.world} | Use </set language:1250617213891907616> to change my language with you!`
      }
    }
    if (message.content.replace("!", "") === `<@${client.user.id}>`) return message.reply(text[lang].messageSend);

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(" ");
    const command = args.shift()?.toLowerCase();
    const cmd = client.commands.find((c) => c.name === command || c.aliases && c.aliases.includes(command))

    if (!cmd) return;

    const mentions = message.mentions.users.first()
    const user = mentions || client.users.cache.find((u) => args.some((a) => a === u.id || a === u.username));

    const mentionDb =  await User.findById(user?.id);

    if ((!authorDb && cmd?.requiredDb) && command !== 'registrar')
    return message.channel.send(`${emojis.emojis.warn} | ${message.author}, you are not registered in my database. Use </register:1250629036783173654> to register!`);
  
    if ((!mentionDb && user) && cmd?.requiredDb)
    return message.channel.send(`${emojis.emojis.warn} | ${message.author}, the user **${user.username}** is not registered in my database!`);
try {
    if(cmd) {
        cmd.run({client, message, args, authorDb})
        }
    } catch (err) {
      console.log(err);
    }
  },
}