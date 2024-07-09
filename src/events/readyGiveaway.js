const GuildModel = require('../../Schemas/guilds');
const emojis = require('../../assets/emojis.json');
module.exports = {
  name: 'ready',
  run: async (client) => {
    const cachedGuilds = client.guilds.cache.values();
    for (const guild of cachedGuilds) {
      const db = await GuildModel.findById(guild.id, { giveaway: 1 });

      if (db?.giveaway?.size > 0) {
        for (const [messageId, values] of db.giveaway) {
          setTimeout(async () => {
            const premio = values.premio;
            const channel = guild.channels.cache.get(values.channelId);
            const ganhadores = values.winners
            const messages = await channel.messages.fetch();
            const message = messages.get(messageId);
            const reaction = message.reactions.cache.get('🎉');
            const users = await reaction.users.fetch();
            const userIsNotBot = users.filter(u => !u.bot);
            let array = [];
            for (let i = 0; i < ganhadores && i < userIsNotBot.size; i++) {
            const ganhador = userIsNotBot.random();
            if (array.includes(ganhador.id)) {
            return;
            } else {
            array.push(ganhador.id);
            }
          }
            const winner = userIsNotBot.size <= 0 ? `${emojis.emojis.warn} | This giveaway has been canceled, there were no participants.` : `${emojis.emojis.stars} | Congratulations <@${array.join('>, <@')}>, you won the giveaway with the prize: \`${premio}\`!`

            message.reply(`${winner}`);
            await GuildModel.findByIdAndUpdate(
              guild.id,
              { $unset: { [`giveaway.${messageId}`]: 1 } },
              { new: true });
          }, Math.max(values.timestamp - Date.now(), 0));
        }
      }
    }
  }
}