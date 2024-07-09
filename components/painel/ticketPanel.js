const Discord = require('discord.js');
const emojis = require('../../assets/emojis.json');
const Guild = require('../../Schemas/guilds');
module.exports = {
    name: 'optionsPanelTicket',
    authorOnly: true,
    execute: async ({client, interaction, userdb, args}) => {
        const guildId = await Guild.findById({_id: interaction.guild.id});
        const userLang = userdb.language;

        const botaoVoltar = new Discord.ButtonBuilder()
        .setCustomId(`optionsPanel-${interaction.user.id}-voltar`)
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji(emojis.emojis.forward);

        const embed = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.mention} Ticket System`)
        .setColor('#5f9ea0')

        let embedConfigurative = new Discord.EmbedBuilder()
        .setTitle(`${emojis.emojis.config} | ${userLang === 'en' ? 'Embed Title' : 'Título do embed'}`)
        .setFooter({text: `© Hoot Bot | ${userLang === 'en' ? 'Your bot tickets favorite!' : 'Seu bot de tickets favorito!'}`})
        .setColor('#5f9ea0')

        const botaoSend = new Discord.ButtonBuilder()
            .setLabel(`${userLang === 'en' ? 'Send' : 'Enviar'}`)
            .setCustomId(`optionsPanelTicket-${interaction.user.id}-sendEmbed`)
            .setStyle(Discord.ButtonStyle.Secondary)
            .setEmoji(emojis.emojis.send);

            const selectMenu = new Discord.StringSelectMenuBuilder()
            .setCustomId(`optionsPanelTicket-${interaction.user.id}-embedTicketSet`)
            .setPlaceholder(`${userLang === 'en' ? 'Which item would you like to modify?' : 'Qual item deseja modificar?'}`)
            .addOptions(
                new Discord.StringSelectMenuOptionBuilder()
                .setLabel(`${userLang === 'en' ? 'Title' : 'Título'}`)
                .setValue('title')
                .setEmoji(`${emojis.emojis.tag}`)
                .setDefault(false),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel(`${userLang === 'en' ? 'Description' : 'Descrição'}`)
                .setValue('description')
                .setEmoji(`${emojis.emojis.list}`)
                .setDefault(false),

                new Discord.StringSelectMenuOptionBuilder()
                .setLabel(`${userLang === 'en' ? 'Color' : 'Cor'}`)
                .setValue('color')
                .setEmoji(`${emojis.emojis.palette}`),
            );
            const row = new Discord.ActionRowBuilder().addComponents(selectMenu);
            const rowButton = new Discord.ActionRowBuilder().addComponents(botaoSend, botaoVoltar);

        // Embeds interactions
        if(args[1] === 'embedTicketConfig'){
            embed.setDescription(`${userLang === 'en' ? 'Configure the main embed where the button to create a ticket will be located.' : 'Configure o embed principal onde terá o botão de criar ticket.'}`)
            interaction.reply({embeds: [embed, embedConfigurative], components: [row, rowButton]});
        }
        
        if(args[1] === 'embedTicketSet'){
            const values = interaction.values[0];
            const row = new Discord.ActionRowBuilder()
            if(values === 'title'){
                const modalTitle = new Discord.ModalBuilder()
                .setTitle(`${userLang === 'en' ? 'Title' : 'Título'}`)
                .setCustomId(`optionsPanelTicket-${interaction.user.id}-modalEmbed-title`)

                const textInput = new Discord.TextInputBuilder()
                .setCustomId(`title`)
                .setLabel(`${userLang === 'en' ? 'Title' : 'Título'}`)
                .setPlaceholder(`${userLang === 'en' ? 'Type the title of the embed.' : 'Digite o título do embed.'}`)
                .setMaxLength(50)
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short);

                row.addComponents(textInput)
                modalTitle.addComponents(row);
                await interaction.showModal(modalTitle);
            }

            if(values === 'description'){
                const modalDescription = new Discord.ModalBuilder()
                .setTitle(`${userLang === 'en' ? 'Description' : 'Descrição'}`)
                .setCustomId(`optionsPanelTicket-${interaction.user.id}-modalEmbed-description`)

                const textInput = new Discord.TextInputBuilder()
                .setCustomId(`description`)
                .setLabel(`${userLang === 'en' ? 'Description' : 'Descrição'}`)
                .setPlaceholder(`${userLang === 'en' ? 'Type the description of the embed.' : 'Digite a descrição do embed.'}`)
                .setMaxLength(200)
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Paragraph);

                row.addComponents(textInput)
                modalDescription.addComponents(row);
                await interaction.showModal(modalDescription);

            }

            if(values === 'color'){
                const modalColor = new Discord.ModalBuilder()
                .setTitle(`${userLang === 'en' ? 'Color' : 'Cor'}`)
                .setCustomId(`optionsPanelTicket-${interaction.user.id}-modalEmbed-color`)
                
                const textInput = new Discord.TextInputBuilder()
                .setCustomId(`color`)
                .setLabel(`${userLang === 'en' ? 'Color' : 'Cor'}`)
                .setPlaceholder(`${userLang === 'en' ? 'Type the color of the embed.' : 'Digite a cor do embed.'}`)
                .setMaxLength(7)
                .setRequired(true)
                .setStyle(Discord.TextInputStyle.Short);

                row.addComponents(textInput)
                modalColor.addComponents(row);
                await interaction.showModal(modalColor);
            }
        }

        if(args[1] === 'modalEmbed'){
            if(args[2] === 'title'){
                const title = interaction.fields.getTextInputValue('title')
                console.log(title)
                embedConfigurative.setTitle(title);
                embed.setDescription(`${userLang === 'en' ? 'Configure the main embed where the button to create a ticket will be located.' : 'Configure o embed principal onde terá o botão de criar ticket.'}`)
                interaction.update({embeds: [embed, embedConfigurative], components: [row, rowButton]});
            }

            if(args[2] === 'description'){
                const desc = interaction.fields.getTextInputValue('description')
                embedConfigurative.setDescription(desc);
                console.log(embedConfigurative.data)
                embed.setDescription(`${userLang === 'en' ? 'Configure the main embed where the button to create a ticket will be located.' : 'Configure o embed principal onde terá o botão de criar ticket.'}`)
                interaction.reply('Ok')
            }
        }

        if(args[1] === 'sendEmbed'){
            console.log(embedConfigurative.data)
            const canalSelect = new Discord.ChannelSelectMenuBuilder()
            .setCustomId(`optionsPanelTicket-${interaction.user.id}-sendFinallyEmbed`)
            .setPlaceholder(`${userLang === 'en' ? 'Select the channel where the embed will be sent.' : 'Selecione o canal onde o embed será enviado.'}`)
            .setChannelTypes(Discord.ChannelType.GuildText);

            const row = new Discord.ActionRowBuilder().addComponents(canalSelect);
            interaction.reply({content: `${userLang === 'en' ? 'Select the channel where the embed will be sent.' : 'Selecione o canal onde o embed será enviado.'}`, components: [row], ephemeral: true});
        }

        if(args[1] === 'sendFinallyEmbed'){
            const channelInteraction = interaction.values[0];
            const channel = client.channels.cache.get(channelInteraction);
            if (!interaction.guild.members.me.permissionsIn(channel).has("ViewChannel") || !interaction.guild.members.me.permissionsIn(channel).has("SendMessages")) return interaction.reply(`${emojis.emojis.warn} | ${interaction.user}, oi`)
            channel.send({embeds: [embedConfigurative]});
        }
        /* ------------------- */
        // Others interactions
        if(args[1] === 'categoryTicket'){
            interaction.reply({content: 'Em breve'})
        }

        if(args[1] === 'logsTicketCanal'){
            interaction.reply({content: 'Em breve'})
        }

        if(args[1] === 'transcriptsTicketCanal'){
            interaction.reply({content: 'Em breve'})
        }

        if(args[1] === 'rolesStaff'){
            interaction.reply({content: 'Em breve'})
        }
    }
}