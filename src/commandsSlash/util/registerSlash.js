const Discord = require("discord.js");
const User = require("../../../Schemas/user");
const emojis = require("../../../assets/emojis.json");
module.exports = {
  name: "register",
  description: "｢Utility｣ Register in my system",
  type: 1,
  run: async ({ client, interaction, userdb }) => {
    const text = {
      br: {
        errorMsg: "você já está registrado no banco de dados!",
        messageSend: `${emojis.emojis.correct} | ${interaction.user}, você foi registrado com sucesso em meu banco de dados! Agora você pode usar todos os meus comandos, utilize </help:1250510627642806342> para ver todos os comandos disponíveis!`,
      },
      en: {
        errorMsg: "you are already registered in the database!",
        messageSend: `${emojis.emojis.correct} | ${interaction.user}, you have been successfully registered in my database! Now you can use all my commands, use </help:1250510627642806342> to see all available commands!`,
      },
    }
    if (userdb)return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, ${text[userdb.language].errorMsg}!`);
    interaction.reply({ content: `${text[userdb?.language ?? 'br'].messageSend}`});
    await User.create({ _id: interaction.user.id });
  },
};