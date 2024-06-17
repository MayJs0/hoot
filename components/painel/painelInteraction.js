const Discord = require("discord.js");
const GuildSchema = require("../../Schemas/guilds");
const emojis = require("../../assets/emojis.json");
module.exports = {
    name: "panel",
    authorOnly: true,
    execute: async ({client, interaction, userdb}) => {
        const guildId = await GuildSchema.findById({_id: interaction.guild.id});
        const userLang = userdb.language;
        const values = interaction?.values[0];

        const embed = new Discord.EmbedBuilder()
        .setColor("#5f9ea0")
        .setFooter({text: `${userLang === 'en' ? 'Settings panel' : 'Painel de configurações'}`, iconURL: interaction.guild.iconURL()})

        const botaoVoltar = new Discord.ButtonBuilder()
        .setCustomId(`optionsPanel-${interaction.user.id}-voltar`)
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji(emojis.emojis.forward);

        if(values === 'canalRecepcao'){
            embed.setTitle(`${emojis.emojis.join} | ${userLang === 'en' ? "Reception channel" : "Canal de recepções"}`)
            .setDescription(`${emojis.emojis.config2} | ${userLang === 'en' ? `Set the channel where entry/exit messages will be sent for members who join or leave the server ${interaction.guild.name} ` : `Defina o canal onde serão enviadas mensagens de entradas/saídas para os membros que entrarem ou sairem do servidor ${interaction.guild.name}`}`);

            const selectCanalBoasVindas = new Discord.ChannelSelectMenuBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-selectWelcome`)
            .setPlaceholder(`${userLang === 'en' ? 'Select the reception channel' : 'Selecione o canal de recepções'}`)
            .setChannelTypes(Discord.ChannelType.GuildText);

            const botaoRemoverWelcome = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-removeWelcome`)
            .setEmoji(emojis.emojis.warn)
            .setLabel(`${userLang === 'en' ? 'Remove reception channel' : 'Remover canal de recepção'}`)
            .setStyle(Discord.ButtonStyle.Danger)
            .setDisabled(guildId.welcome === "false" ? true : false);

            const alterarMsgJoin = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-alterarMsgJoin`)
            .setLabel(`${userLang === 'en' ? 'Change join message' : 'Alterar mensagem de entrada'}`)
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(emojis.emojis.join)
            
            const alterarMsgLeave = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-alterarMsgLeave`)
            .setLabel(`${userLang === 'en' ? 'Change leave message' : 'Alterar mensagem de saída'}`)
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(emojis.emojis.leave)

            const mensagemAtual = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-msgAtual`)
            .setLabel(`${userLang === 'en' ? 'Current messages' : 'Mensagens atuais'}`)
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(emojis.emojis.save)

            const rowSelect = new Discord.ActionRowBuilder().addComponents(selectCanalBoasVindas);
            const rowButtons = new Discord.ActionRowBuilder().addComponents(alterarMsgJoin, alterarMsgLeave, mensagemAtual, botaoRemoverWelcome, botaoVoltar);
            interaction.update({embeds: [embed], components: [rowSelect, rowButtons]});
        }

        if(values === 'canalLogs'){
            embed.setTitle(`${emojis.emojis.anonime} | ${userLang === 'en' ? 'Log channel' : 'Canal de logs'}`)
            .setDescription(`${emojis.emojis.config2} | ${userLang === 'en' ? `Set the channel where the logs will be sent for the server ${interaction.guild.name}` : `Defina o canal onde serão enviados os logs para o servidor ${interaction.guild.name}`}`)
            const selectLogs = new Discord.ChannelSelectMenuBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-logsselect`)
            .setPlaceholder("Selecionar canal de logs")
            .setChannelTypes(Discord.ChannelType.GuildText);
    
            const botaoRemoverLogs = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-removelogs`)
            .setLabel("Remover canal de logs")
            .setStyle(Discord.ButtonStyle.Danger)
            .setDisabled(guildId.logs === false ? true : false);

            const rowSelect = new Discord.ActionRowBuilder().addComponents(selectLogs);
            const rowButtons = new Discord.ActionRowBuilder().addComponents(botaoRemoverLogs, botaoVoltar);
            interaction.update({embeds: [embed], components: [rowSelect, rowButtons]});
        }

        if(values === 'autorole'){
            embed.setTitle(`${emojis.emojis.medal} | AutoRole`)
            .setDescription(`${emojis.emojis.config2} | ${userLang === 'en' ? `Set the autorole for the server ${interaction.guild.name}` : `Defina o autorole para o servidor ${interaction.guild.name}`}`)

            const removeAutoRole = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-removeAutoRole`)
            .setLabel(`${userLang === 'en' ? 'Remove autorole' : 'Remover autorole'}`)
            .setStyle(Discord.ButtonStyle.Danger)
            .setDisabled(guildId.role.r === false ? true : false)
            .setEmoji(emojis.emojis.warn);

            const selectAutoRole = new Discord.RoleSelectMenuBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-selectAutoRole`)
            .setPlaceholder(`${userLang === 'en' ? 'Select the autorole' : 'Selecione o autorole'}`)
            .setMaxValues(3)

            const rowSelect = new Discord.ActionRowBuilder().addComponents(selectAutoRole);
            const rowButtons = new Discord.ActionRowBuilder().addComponents(removeAutoRole, botaoVoltar);
            interaction.update({embeds: [embed], components: [rowSelect, rowButtons]});
        }

        if(values === 'antilink'){
            embed.setTitle(`${emojis.emojis.link} | ${userLang === 'en' ? 'Anti-link' : 'Anti-link'}`)
            .setDescription(`${userLang === 'en' ? `Currently, the antilink system is ${guildId.antilink ? 'enabled' : 'disabled'}` : `Atualmente o sistema de antilink está ${guildId.antilink ? 'ativado' : 'desativado'}`}`)
            const BotaoAtivarAntiLink = new Discord.ButtonBuilder()
            .setCustomId(`optionsPanel-${interaction.user.id}-buttonAntiLink`)
            .setLabel(guildId.antilink ? 'Desativar antilink' : 'Ativar antilink')
            .setEmoji(guildId.antilink ? emojis.emojis.unlock : emojis.emojis.lock)
            .setStyle(Discord.ButtonStyle.Secondary);

            const rowButtons = new Discord.ActionRowBuilder().addComponents(BotaoAtivarAntiLink, botaoVoltar);
            interaction.update({embeds: [embed], components: [rowButtons]});
        }

    }
}