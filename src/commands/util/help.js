module.exports = {
    name: "help",
    requiredDb: true,
    run: async ({client, message, authorDb}) => {
      const text = {
        br: {
          messageSend: "Em breve"
        },
        en: {
          messageSend: "Coming Soon!"
        }
      }
      message.reply(text[authorDb.language].messageSend)
    }
};