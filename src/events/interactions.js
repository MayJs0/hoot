module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (interaction.isCommand()) return;
        if (interaction.message.createdTimestamp < (client.readyTimestamp || 0)) {
            // interaction.message.edit({ components: [] });
            return interaction.reply({ content: '<:jucry:1195522986896269383> | Os dados dessa interação foram perdidos, me desculpe!', ephemeral: true });
        }
        if (interaction.isButton()) {
            const args = interaction.customId.split("-");
            const interactionId = args.shift()
            const buttonData = client.components.get(interactionId);

            if (buttonData?.authorOnly && interaction.user.id !== args[0])
            return interaction.reply({ content: '<:jucry:1195522986896269383> | Esta interação não é para você!', ephemeral: true})

            if (buttonData) buttonData.execute(client, interaction, args);
        }

        if (interaction.isAnySelectMenu()){
            const args = interaction.customId.split("-");
            const interactionId = args.shift()
            const stringMenuData = client.components.get(interactionId);

            if (stringMenuData?.authorOnly && interaction.user.id !== args[0])
            return interaction.reply({ content: '<:jucry:1195522986896269383> | Esta interação não é para você', ephemeral: true})

            if (stringMenuData) stringMenuData.execute(client, interaction, args);
        }

        if (interaction.isModalSubmit()) {
            const args = interaction.customId.split("-");
            const interactionId = args.shift()
            const modalSubmitData = client.components.get(interactionId);

            if (modalSubmitData?.authorOnly && interaction.user.id !== args[0])
            return interaction.reply({ content: '<:jucry:1195522986896269383> | Esta interação não é para você', ephemeral: true})

            if (modalSubmitData) modalSubmitData.execute(client, interaction, args);
        }
    }
}