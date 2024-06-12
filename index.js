const { Client, Collection } = require("discord.js");
const Discord = require('discord.js');
dc = Discord
const User = require("./Schemas/user");
const CacheManager = require("./structs/CacheManager");
require("dotenv").config();
const client = new Client({ intents: 3276799 });
client.commands = new Collection();
client.components = new Collection()
client.login(process.env.TOKEN);

const cm = new CacheManager();
cm.addProp('sobremim');
cm.addProp('jucoins');
cm.addProp('reps');
cm.addProp('backequipado');
cm.addProp('decorationEquipado');
cm.addProp('badges');
cm.addProp('rank');
cm.addProp('casado');

client.cm = cm;
// interactioncreate
client.on('interactionCreate', async(interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.reply(`Error`);
    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);
    //cmd.run(client, interaction)
    const user = interaction.options.getUser('user') || interaction.user;
    const mentionDb =  await User.findById(user?.id);
    const authorDb = await User.findById(interaction.user.id);

    if ((!authorDb && cmd?.requiredDb) && interaction.commandName !== 'registrar')
    return interaction.reply(`<:avisos:1194279514990198886> | ${interaction.user}, você não está registrado no meu banco de dados. Use **/registrar** para se registrar!`);
  
    if ((!mentionDb && user) && cmd?.requiredDb)
    return interaction.reply(`<:avisos:1194279514990198886> | ${interaction.user}, o usuário **${user.username}** não está registrado em meu banco de dados!`);
try {
    if(cmd) {
        cmd.run(client, interaction)
    }
    } catch (err) {
      console.log(err);
    }
  }
})
client.slashCommands = new Discord.Collection();
client.developers = ['551374220953649181', '755106757038178396']; 
require('./handlers/indexSlash')(client) // slashCommands loader
require('./handlers/mongodb') // mongodb connect
require('./handlers/indexPrefix')(client) // commands loader
require('./handlers/components')(client) // components loader
require('./handlers/events')(client) // events loader