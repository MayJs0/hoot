const Discord = require('discord.js');
const emojis = require('../../assets/emojis.json');
const Guilds = require('../../Schemas/guilds');
module.exports = {
    name: 'help',
    authorOnly: true,
    execute: async ({interaction, userdb}) => {
        const userLang = userdb.language;
        const value = interaction.values[0];
        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.bot} | Hoot Commands`)
        .setColor('#5f9ea0')
        .setFooter({text: `${userLang === 'en' ? `Executed by ${interaction.user.username}` : `Executado por ${interaction.user.username}`}`, iconURL: interaction.user.displayAvatarURL()})

        if(value === 'home'){
            const guildId = await Guilds.findById({_id: interaction.guild.id});
            const prefix = guildId.prefix;
            embed.addFields(
                {name: `${userLang === 'en' ? 'Categories' : 'Categorias'} ${emojis.emojis.config2}`, value: `${userLang === 'en' ? 'Choose a category to get help with my commands!' : 'Escolha uma categoria para obter ajuda sobre os meus comandos!'}`},
                {name: `Prefix ${emojis.emojis.hoot}`,  value: `${emojis.emojis.world} Global \`h.\` \n${emojis.emojis.home} Local \`${prefix}\``},
                {name: `${userLang === 'en' ? 'Note' : 'Observação'} ${emojis.emojis.warn}`, value: `${userLang === 'en' ? 'The commands listed in the help are provided in **Slash Commands**, but all of them also work via prefix.' : 'Os comandos que estão no help estão sendo fornecidos em **Slash Commands**, porém todos eles também funcionam via prefixo.'}`},
              )

            interaction.update({embeds: [embed]});
        }
        if(value === 'moderation'){
            embed.addFields(
                {name: '</panel:1251012297372205178>', value: `${userLang === 'en' ? 'Configure your server with Hoot!' : ' Configure seu servidor com o Hoot!'}`}
            )
            interaction.update({embeds: [embed]});
        }
        if(value === 'utility'){
            embed.addFields(
                {name: '</help:1250510627642806342>', value: `${userLang === 'en' ? 'Visualize my commands' : 'Visualize meus comandos'}`, inline: true},
                {name: '</avatar:1252083132371566593>', value: `${userLang === 'en' ? 'Vizualize your avatar!' : 'Vizualize seu avatar!'}`, inline: true},
                {name: '</ping:1250508620274077748>', value: `${userLang === 'en' ? 'Check my latency!' : 'Verifique minha latência!'}`, inline: true},
                {name: '</set language:1250617213891907616>', value : `${userLang === 'en' ? 'Set my language!' : 'Defina meu idioma!'}`, inline: true},
                {name: '</user info:1250971939032530994>', value: `${userLang === 'en' ? 'Visualize your information!' : 'Visualize suas informações!'}`, inline: true},
                {name: '</server info:1251002294284062831>', value: `${userLang === 'en' ? 'Visualize server information!' : 'Visualize informações do servidor!'}`, inline: true},
                {name: '</register:1250629036783173654>', value: `${userLang === 'en' ? 'Register in my system!' : 'Registre-se em meu sistema!'}`, inline: true},
            )
            interaction.update({embeds: [embed]});
        }
    }
}