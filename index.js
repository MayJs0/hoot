const { Client, Collection } = require("discord.js");
const Discord = require('discord.js');
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

client.slashCommands = new Discord.Collection();
client.developers = ['551374220953649181', '755106757038178396']; 
require('./handlers/indexSlash')(client) // slashCommands loader
require('./handlers/mongodb') // mongodb connect
require('./handlers/indexPrefix')(client) // commands loader
require('./handlers/components')(client) // components loader
require('./handlers/events')(client) // events loader