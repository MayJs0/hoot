const Discord = require("discord.js");
const guilds = require("../../../Schemas/guilds");
const emojis = require("../../../assets/emojis.json");
module.exports = {
    name: 'panel',
    description: "｢Moderation｣ Configure your server",
    type: 1,
    run: async({client, interaction, userdb}) => {
        const userLang = userdb.language;
        const Guild = await guilds.findOne({ _id: interaction.guild.id });
        const texts = {
            br: {
                errorAttachFiles: `eu não possuo a permissão de \`Anexar arquivos\`!`,
                errorManageMessages: `eu não possuo a permissão de \`Gerenciar mensagens\`!`,
                errorManageRoles: `eu não possuo a permissão de \`Gerenciar cargos\`!`,
                errorAdmin: `você não possui a permissão de \`Administrador\`!`,
                none: "Nenhum",
                msgPrincipal: "Configure tudo o que o seu servidor precisa para tornar-se mais organizado e seguro!",
            },
            en: {
                errorAttachFiles: `I do not have permission to \`Attach files\`!`,
                errorManageMessages: `I do not have the permission to \`Manage messages\`!`,
                errorManageRoles: `I do not have the permission to \`Manage roles\`!`,
                errorAdmin: `you do not have the permission of \`Administrator\`!`,
                none: "None",
                msgPrincipal: "Set up everything your server needs to become more organized and secure!"
            }
        }
        if (!interaction.guild.members.me.permissions.has("AttachFiles")) {
            return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, ${texts[userLang].errorAttachFiles}`);
        }
        if (!interaction.guild.members.me.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, ${texts[userLang].errorManageMessages}`);
        }
        if (!interaction.guild.members.me.permissions.has(Discord.PermissionFlagsBits.ManageRoles)) {
            return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, ${texts[userLang].errorManageRoles}`);
        }
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, ${texts[userLang].errorAdmin}`);
        }
        const opcoes = new Discord.StringSelectMenuBuilder()
        .setCustomId(`panel-${interaction.user.id}-opcoes`)
        .setPlaceholder(`${userLang === 'en' ? 'What do you want to do?' : 'O que deseja fazer?'}`)
        .addOptions(
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`${userLang === 'en' ? "Activate and configure reception channel" : 'Ativar e configurar canal de recepção'}`)
            .setValue('canalRecepcao')
            .setEmoji(`${emojis.emojis.join}`)
            .setDefault(false),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`${userLang === 'en' ? "Enable log channel" : 'Ativar canal de logs'}`)
            .setValue('canalLogs')
            .setEmoji(`${emojis.emojis.anonime}`)
            .setDefault(false),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`${userLang === 'en' ? "Enable autorole" : 'Ativar autorole'}`)
            .setValue('autorole')
            .setEmoji(`${emojis.emojis.medal}`)
            .setDefault(false),
            new Discord.StringSelectMenuOptionBuilder()
            .setLabel(`${userLang === 'en' ? "Enable antilink" : 'Ativar antilink'}`)
            .setValue('antilink')
            .setEmoji(`${emojis.emojis.link}`)
            .setDefault(false)
        )

        const rowOpcoes = new Discord.ActionRowBuilder().addComponents(opcoes);

        const canal = Guild.channel ?? `${texts[userLang].none}`
        const canalLogs = Guild.channelLogs ?? `${texts[userLang].none}`
        const statusAntilink = Guild.antilink
        const cargo = Guild.role.id ?? `${texts[userLang].none}`

        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.config} | Painel de configuração`)
        .addFields(
            {
                name: `${userLang === 'en' ? "Configure your server" : "Configure o seu servidor 🔧"}`,
                value: `${texts[userLang].msgPrincipal}`,
                inline: true,
            },
            {
                name: `${userLang === 'en' ? 'Reception channel' : 'Canal de recepção'} ${emojis.emojis.join}`,
                value: `${canal == "Nenhum" || "None" ? `${texts[userLang].none}` : `<#${canal}>`}`,
                inline: false,
            },
            {
                name: `${userLang === 'en' ? 'Log channel' : 'Canal de logs'} ${emojis.emojis.anonime}`,
                value: `${canalLogs == "Nenhum" || "None" ? `${texts[userLang].none}` : `<#${canalLogs}>`}`,
                inline: true,
            },
            {
                name: `Antilink ${emojis.emojis.link}`,
                value: `${statusAntilink ? `${emojis.emojis.on}` : `${emojis.emojis.off}`}`,
                inline: true,
            },
            {
                name: `Autorole ${emojis.emojis.medal}`,
                value: `${cargo == "Nenhum" || "None" ? `${texts[userLang].none}` : `<@&${cargo.replace("-", "><@&")}>`}`,
                inline: true,
            }
        )
        .setThumbnail("https://cdn.discordapp.com/attachments/1187881183611207850/1214369098801217557/dashboard.png?ex=65f8dc5b&is=65e6675b&hm=e83ac684fa552d88c14fcd34a942bfee08c9fa8846761f1e65c06161c392fd6b&")
        .setImage("https://cdn.discordapp.com/attachments/1197555203965198377/1223807999232053328/Captura_de_Tela_2024-03-30_as_22.28.41.png?ex=661b3304&is=6608be04&hm=f2dcd87586966c32e7ad450319d9ad7e2153f674d9f7814ed1f6e16c866710a1&")
        .setColor("#5f9ea0");
        interaction.reply({
            embeds: [embed],
            components: [rowOpcoes],
        });
    }
}