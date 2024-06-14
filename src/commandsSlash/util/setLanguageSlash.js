const Discord = require('discord.js');
const User = require('../../../Schemas/user');
const emojis = require('../../../assets/emojis.json');
module.exports = {
    name: 'set',
    description: '｢Utility｣ Set the language of the bot',
    type: Discord.ApplicationCommandOptionType.Subcommand,
    options: [
        {
            name: 'language',
            description: '｢Utility｣ Choose the language you want to set',
            type: 1,
            options: [{
                name: 'language',
                description: 'Choose the language you want to set',
                type: Discord.ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                        name: 'en-us',
                        value: 'en'
                    },
                    {
                        name: 'pt-br',
                        value: 'br'
                    }
                ]
            }]
        }
    ],
    run: async ({client, interaction}) => {
        const language = interaction.options.getString('language');
        interaction.reply({content: `${emojis.emojis.world} | ${language === 'en' ? 'Language set to **English**!' : 'Idioma definido para **Português Brasil**!'}`})
        await User.updateOne({_id: interaction.user.id}, {
            $set: {
                language: language
            }
        })
    }
}