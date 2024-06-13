module.exports = {
    name: "ping",
    description: "｢Utility｣ Visualize my ping",
    type: 1,
    run: async (client, interaction) => {
    interaction.reply(`<:pingpong:1191493166575128667> | Pong! \`${client.ws.ping}ms\``)
  
  }};