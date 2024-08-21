const guilds = require("../../Schemas/guilds");
const emojis = require("../../assets/emojis.json");
module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if(message.content.includes('gif')) return;
    const guilddb = await guilds.findOne({ _id: message.guild.id }) || await guilds.create({ _id: message.guild.id });
    if(!guilddb.antilink) return;
    function checkUrl(string) {
        try {
            let url = new URL(string)
            return true
       } catch(err) {
           return false
       }
     }
     
    if(checkUrl(message.content)) { 
        message.channel.send(`${emojis.emojis.incorrect} | ${message.author}, you can't send links here!`) 
        message.delete().then(() => {}).catch(() => {})
    }
  }
}