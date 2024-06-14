const emojis = require('../../assets/emojis.json');
const User = require('../../Schemas/user');
module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        const userdb = await User.findById({ _id: interaction.user.id });
        const userLang = userdb.language;
        const texts = {
            br: {
                notInteraction: "Esta interação não é para você!",
                lostData: `Os dados dessa interação foram perdidos, me desculpe!`
            },
            en: {
                notInteraction: "This interaction is not for you!",
                lostData: `The data from this interaction was lost, sorry!`
            }
        }

        if (interaction.isCommand()) return;
        if (interaction.message.createdTimestamp < (client.readyTimestamp || 0)) {
            // interaction.message.edit({ components: [] });
            return interaction.reply({ content: `${emojis.emojis.warn} | ${texts[userLang].lostData}`, ephemeral: true });
        }
        if (interaction.isButton()) {
            const args = interaction.customId.split("-");
            const interactionId = args.shift()
            const buttonData = client.components.get(interactionId);

            if (buttonData?.authorOnly && interaction.user.id !== args[0])
            return interaction.reply({ content: `${emojis.emojis.warn} | ${texts[userLang].lostData}`, ephemeral: true})

            if (buttonData) buttonData.execute({client, interaction, userdb, args});
        }

        if (interaction.isAnySelectMenu()){
            const args = interaction.customId.split("-");
            const interactionId = args.shift()
            const stringMenuData = client.components.get(interactionId);

            if (stringMenuData?.authorOnly && interaction.user.id !== args[0])
            return interaction.reply({ content: `${emojis.emojis.warn} | ${texts[userLang].lostData}`, ephemeral: true})

            if (stringMenuData) stringMenuData.execute({client, interaction, userdb, args});
        }

        if (interaction.isModalSubmit()) {
            const args = interaction.customId.split("-");
            const interactionId = args.shift()
            const modalSubmitData = client.components.get(interactionId);

            if (modalSubmitData?.authorOnly && interaction.user.id !== args[0])
            return interaction.reply({ content: `${emojis.emojis.warn} | ${texts[userLang].lostData}`, ephemeral: true})

            if (modalSubmitData) modalSubmitData.execute({client, interaction, userdb, args});
        }
    }
}