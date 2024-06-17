const Discord = require("discord.js");
const emojis = require("../../../assets/emojis.json");
const Guilds = require("../../../Schemas/guilds");
module.exports = {
    name: "help",
    description: "｢Utility｣ Visualize my commands",
    type: 1,
    requiredDb: true,
    run: async ({client, message, authorDb}) => {
      const guildId = await Guilds.findById({_id: message.guild.id});
      const prefix = guildId.prefix;
      const userLang = authorDb.language;
      const embed = new Discord.EmbedBuilder()
      .setTitle(`${emojis.emojis.bot} | Hoot Commands`)
      .addFields(
        {name: `${userLang === 'en' ? 'Categories' : 'Categorias'} ${emojis.emojis.config2}`, value: `${userLang === 'en' ? 'Choose a category to get help with my commands!' : 'Escolha uma categoria para obter ajuda sobre os meus comandos!'}`},
        {name: `Prefix ${emojis.emojis.hoot}`,  value: `${emojis.emojis.world} Global \`h.\` \n${emojis.emojis.home} Local \`${prefix}\``},
        {name: `${userLang === 'en' ? 'Note' : 'Observação'} ${emojis.emojis.warn}`, value: `${userLang === 'en' ? 'The commands listed in the help are provided in **Slash Commands**, but all of them also work via prefix.' : 'Os comandos que estão no help estão sendo fornecidos em **Slash Commands**, porém todos eles também funcionam via prefixo.'}`},
      )
      .setColor("#5f9ea0")
      .setFooter({text: `${userLang === 'en' ? `Executed by ${message.author.username}` : `Executado por ${message.author.username}`}`, iconURL: `${message.author.displayAvatarURL()}`})

      const selectMenu = new Discord.StringSelectMenuBuilder()
      .setCustomId(`help-${message.author.id}`)
      .setPlaceholder(`${userLang === 'en' ? 'Select a category' : 'Selecione uma categoria'}`)
      .addOptions(
        new Discord.StringSelectMenuOptionBuilder()
        .setEmoji(emojis.emojis.home)
        .setLabel(`${userLang === 'en' ? 'Home' : 'Início'}`)
        .setValue('home'),

        new Discord.StringSelectMenuOptionBuilder()
        .setEmoji(emojis.emojis.escudo)
        .setLabel(`${userLang === 'en' ? 'Moderation' : 'Moderação'}`)
        .setValue('moderation'),

        new Discord.StringSelectMenuOptionBuilder()
        .setEmoji(emojis.emojis.user)
        .setLabel(`${userLang === 'en' ? 'Utility' : 'Utilidade'}`)
        .setValue('utility'),
      )

      const row = new Discord.ActionRowBuilder().addComponents(selectMenu);
      message.reply({embeds: [embed], components: [row]});
    }
};