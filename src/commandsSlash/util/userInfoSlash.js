const Discord = require("discord.js");
const emojis = require("../../../assets/emojis.json");
module.exports = {
  name: "user",
  description: "｢Utility｣ Visualize your information",
  type: Discord.ApplicationCommandOptionType.Subcommand,
  options: [
    {
      name: "info",
      description: "｢Utility｣ Visualize your information",
      type: 1,
      options: [
        {
          name: "user",
          description: "Select a user",
          type: 6,
          required: false,
        },
      ],
    },
  ],
  run: async ({ client, interaction, userdb }) => {
    const user = interaction.options.getUser("user") || interaction.user;
    const userlang = userdb.language;
    let member = interaction.guild.members.cache.get(user.id);

    let badges = user.flags.toArray();
    badges = badges
      .join(" ")
      .replace("HypeSquadOnlineHouse1", "<:badge7:1194434758919344188>")
      .replace("HypeSquadOnlineHouse2", "<:badge4:1194431484048715878>")
      .replace("HypeSquadOnlineHouse3", "<:badge1:1194431444525781094>")
      .replace("Hypesquad", "<:badge11:1194434886170325033>")
      .replace("ActiveDeveloper", "<:badge6:1194431516797829191>")
      .replace("VerifiedBot", "<:badge12:1194436890313621646>")
      .replace("BugHunterLevel1", "<:badge3:1194431471369334888>")
      .replace("BugHunterLevel2", "<:badge10:1194434868390666370>")
      .replace("VerifiedDeveloper", "<:badge2:1194431458471845928>")
      .replace("Partner", "<:badge8:1194434779534348288>")
      .replace("Staff", "<:badge9:1194434852938862645>")
      .replace("CertifiedModerator", "<:badge13:1194439493864919121>")
      .replace("BotHTTPInteractions", "")
      .replace("PremiumEarlySupporter", "<:badge5:1194431500154830969>");
    if (badges.length == 0) {
      badges = "Nenhuma";
    }

    if (!member) {
      let em = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.list} | ${userlang === 'en' ? `Information of ${user.username}` : `Informações de ${user.username}`}`)
        .addFields(
          {
            name: `${emojis.emojis.user} ${userlang === 'en' ? `User ID` : `ID do usuário`}`,
            value: `\`${user.id}\``,
            inline: true,
          },
          {
            name: `${emojis.emojis.mention} ${userlang === 'en' ? `Discord Tag` : `Tag do discord`}`,
            value: `\`@${user.tag}\``,
            inline: true,
          },
          {
            name: `${emojis.emojis.verified} Badges`,
            value: `${badges}`,
            inline: true,
          },
          {
            name: `\n ${emojis.emojis.calendar} ${userlang === 'en' ? `Account creation` : `Criação da conta`}`,
            value: `<t:${parseInt(user.createdTimestamp / 1000)}:D>`,
            inline: true,
          }
        )
        .setThumbnail(user.displayAvatarURL())
        .setColor("#5f9ea0")
        .setFooter({
          text: `${userlang === 'en' ? `Executed by ${interaction.user.username}` : `Executado por ${interaction.user.username}`}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });
      interaction.reply({
        embeds: [em],
      });
    } else {
      const roles = member.roles.cache
        .map((role) => role)
        .filter((data) => data.name !== "@everyone");
      const sliced = roles.slice(0, 2);
      const counter = roles.length > 2 ? `+${roles.length - 2}` : `${userlang === 'en' ? `none` : `não possui`}`;

      const joined = interaction.guild.members.cache.get(
        user.id
      ).joinedTimestamp;
      const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.list} | ${userlang === 'en' ? `Information of ${user.username}` : `Informações de ${user.username}`}`)
        .addFields(
          {
            name: `${emojis.emojis.user} ${userlang === 'en' ? `User ID` : `ID do usuário`}`,
            value: `\`${user.id}\``,
            inline: true,
          },
          {
            name: `${emojis.emojis.mention} ${userlang === 'en' ? `Discord Tag` : `Tag do discord`}`,
            value: `\`@${user.tag}\``,
            inline: true,
          },
          {
            name: `${emojis.emojis.verified} Badges`,
            value: `${badges}`,
            inline: true,
          },
          {
            name: `\n ${emojis.emojis.calendar} ${userlang === 'en' ? `Account creation` : `Criação da conta`}`,
            value: `<t:${parseInt(user.createdTimestamp / 1000)}:D>`,
            inline: true,
          },
          {
            name: `${emojis.emojis.join} ${userlang === 'en' ? `Join date` : `Data de entrada`}`,
            value: `<t:${parseInt(joined / 1000)}:D>`,
            inline: true,
          },
          {
            name: `\n${emojis.emojis.anonime} ${userlang === 'en' ? `Roles` : `Cargos`}`,
            value: `${sliced.join(" ")} ${counter} ${userlang === 'en' ? "additional roles." : `cargos adicionais.`}`,
          }
        )
        .setThumbnail(user.displayAvatarURL())
        .setColor("#5f9ea0")
        .setFooter({
          text: `${userlang === 'en' ? `Executed by ${interaction.user.username}` : `Executado por ${interaction.user.username}`}`,
          iconURL: `${interaction.user.displayAvatarURL()}`,
        });

      interaction.reply({
        embeds: [embed],
      });
    }
  },
};