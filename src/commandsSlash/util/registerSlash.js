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
        messageSend: "Registrado com sucesso!",
      },
      en: {
        errorMsg: "you are already registered in the database!",
        messageSend: "Registred successfully!",
      },
    }
    if (userdb)return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, ${text[userdb.language].errorMsg}!`);
    interaction.reply({ content: `${text[userdb.language].messageSend}`});
    await User.create({ _id: interaction.user.id });
  },
};