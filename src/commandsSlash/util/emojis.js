const dc = require("discord.js");
module.exports = {
    name: "emojis",
    description: "sim",
    type: 1,
    options: [
        {
            name: "origem",
            description: "De onde você quer ver os emojis",
            type: dc.ApplicationCommandOptionType.String,
            choices: [
                {name: "servidor", value: "guild"},
                {name: "bot", value: "client"},
            ]
        }
    ],
    run: async (client,interaction) => {
        const {options} = interaction;
        const source = options.getString("origem");
        const emojis = interaction[source].emojis.cache;
        const [animatedEmojis, staticEmojis] = emojis.partitin(e => !!e.animated)
        const json = {
            animated: animatedEmojis.reduce(
                (obj, {id, name}) => Object.assign(obj, {[name??id]: id}), {}
            ),
            static: staticEmojis.reduce(
                (obj, {id, name}) => Object.assign(obj, {[name??id]: id}), {}
            )
        }
        const buffer = Buffer.from(JSON.stringify(json, null, 2));
        const attachment = new dc.MessageAttachment(buffer, {name: "emojis.json"});
        interaction.reply({files: [attachment]});
  }};