const Discord = require('discord.js');
const emojis = require('../../assets/emojis.json');
const Guild = require('../../Schemas/guilds');
module.exports = {
    name: 'optionsPanel',
    authorOnly: true,
    execute: async ({client, interaction, userdb, args}) => {
        const guildId = await Guild.findById({_id: interaction.guild.id});
        const userLang = userdb.language;
        const texts = {
            br: {
                selectWelcome: `${emojis.emojis.warn} | O canal \`[canal]\` foi selecionado com sucesso e agora novos membros serão recepcionados!`,
                logsSelect: `${emojis.emojis.warn} | O canal \`[canal]\` foi selecionado com sucesso e agora as logs irão aparecer por lá 👀!`,
                removeRole: `${emojis.emojis.warn} | O cargo [cargo] foi removido como autorole!`,
                sendErrorRole: `${emojis.emojis.warn} | ${interaction.user}, o cargo [cargo] é maior que o meu!`,
                sendOkRole: `${emojis.emojis.warn} | O(s) cargo(s) \`[array]\` foram setados como cargos automáticos!`,
                removeChannelWelcome: `${emojis.emojis.warn} | O canal [canal] foi removido e os membros não serão mais recepcionados!`,
                removeChannelLogs: `${emojis.emojis.warn} | O canal [canal] foi removido e não serão mais enviadas __logs__ para este canal!`
            },
            en: {
                selectWelcome: `${emojis.emojis.warn} | The channel \`[canal]\` has been successfully selected, and now new members will be welcomed!`,
                logsSelect: `${emojis.emojis.warn} | The channel \`[canal]\` has been successfully selected, and now the logs will appear there! 👀!`,
                removeRole: `${emojis.emojis.warn} | The role [cargo] has been removed as autorole!`,
                sendErrorRole: `${emojis.emojis.warn} | ${interaction.user}, the role [cargo] is higher than mine!`,
                sendOkRole: `${emojis.emojis.warn} | The role(s) \`[array]\` have been set as automatic roles!`,
                removeChannelWelcome: `${emojis.emojis.warn} | The channel [canal] has been removed, and members will no longer be welcomed!`,
                removeChannelLogs: `${emojis.emojis.warn} | The channel [canal] has been removed, and no more logs will be sent to this channel!`
            }
        }

        const botaoVoltar = new Discord.ButtonBuilder()
        .setCustomId(`optionsPanel-${interaction.user.id}-voltar`)
        .setStyle(Discord.ButtonStyle.Primary)
        .setEmoji(emojis.emojis.forward);

        const rowButton = new Discord.ActionRowBuilder().addComponents(botaoVoltar);

        if(args[1] === "selectWelcome"){
            const value = interaction.values[0];
            const channel = interaction.guild.channels.cache.get(value);
            interaction.update({content: `${texts[userLang].selectWelcome.replace('[canal]', `${channel.name}`)}`, components: [rowButton], embeds: []});
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                $set: {
                  channel: channel.id,
                  welcome: true,
                },
              });
                */
        }
        if(args[1] === "logsselect"){
            const value = interaction.values[0];
            const channel = interaction.guild.channels.cache.get(value);
            interaction.update({content: `${texts[userLang].logsSelect.replace('[canal]', `${channel.name}`)}`, components: [rowButton], embeds: []});
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                $set: {
                    channelLogs: channel.id,
                    logs: true,
                },
            });*/
        }
        if(args[1] === "removeAutoRole"){
            interaction.reply({content: `${texts[userLang].removeRole.replace('[cargo]', `<@&${guildId.role.id.replace("-","><@&")}>`)}`, components: [rowButton], embeds: [], ephemeral: true});
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                    set: {
                        role: { r: false, id: "Nenhum" },
                    },
            });*/
        }

        if(args[1] === "selectAutoRole"){
            const values = interaction.values;
            const roleArray = [];
            for (const role of values) {
                if (interaction.guild.members.me.roles.highest.comparePositionTo(role.toString()) > 1) {
                    roleArray.push(interaction.guild.roles.cache.get(role)['name'])
                } else {
                    return interaction.reply({ content: `${texts[userLang].sendErrorRole.replace('[cargo]', `<@&${role}>`)}`, ephemeral: true })
                }
            }
            interaction.update({content: `${texts[userLang].sendOkRole.replace('[array]', `${roleArray.join(", ")}`)}`, components: [rowButton]});
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                $set: {
                    role: { r: true, id: values.join("-") },
                },
            });*/
        }
        if(args[1] === "buttonAntiLink"){
            let mensagem = `${emojis.emojis.warn} | ${interaction.user}, ${Guild.antilink? `${userLang === 'en' ? 'the __anti-link__ system has been deactivated in this server!' : 'o sistema de __antilink__ foi desativado neste servidor!'}` : `${userLang === 'en' ? 'the __anti-link__ system has been activated in this server!' : 'o sistema de __antilink__ foi ativado neste servidor!'}`}`;
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                antilink: Guild.antilink ? false : true,
            });*/
            return interaction.update({content: mensagem, ephemeral: true, components: [rowButton], embeds: []});
        }
        
        if(args[1] === "removeWelcome"){
            interaction.update({content: `${texts[userLang].removeChannelWelcome.replace('[canal]',`<#${guildId.channel}>`)}`, components: [rowButton], embeds: []});
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                channel: "Nenhum",
                welcome: "false",
            });*/
        }
        
        if(args[1] === "removelogs"){
            interaction.update({content: `${texts[userLang].removeChannelLogs.replace('[canal]',`<#${guildId.channelLogs}>`)}`, components: [rowButton], embeds: []});
            /*await Guild.updateOne({ _id: interaction.guild.id },{
                channelLogs: "Nenhum",
                logs: false,
            });*/
        }

        if(args[1] === "alterarMsgJoin"){
            interaction.reply({embeds: [
                new Discord.EmbedBuilder()
                .setTitle(`${emojis.emojis.list2} | ${userLang === 'en' ? 'Changing welcome message' : 'Alterando mensagem de boas-vindas'}`)
                .addFields(
                    {name: `${userLang === 'en' ? 'Current message' : 'Mensagem atual'} ${emojis.emojis.join}`, value: `${guildId.welcomeMessage ?? `${emojis.emojis.join} Boas-vindas ao servidor! \n ${emojis.emojis.announcement} Leia as nossas ${interaction.guild.rulesChannelId === null ? 'regras' : `<#${interaction.guild.rulesChannelId}>`} para viver de bem conosco!\n${emojis.emojis.escudo} Precisa de ajuda? Entre em contato com a equipe do servidor!`}`, inline: true},
                    {name: `${userLang === 'en' ? 'How to change' : 'Como alterar'}? 🤔`, value: `${userLang === 'en' ? 'Please enter the new welcome message in the chat.' : 'Digite a nova mensagem de boas-vindas no chat.'}`, inline: true},
                    {name: `${userLang === 'en' ? 'Keywords': 'Palavras chaves'} ${emojis.emojis.key}`, value: `**{member}** - ${userLang === 'en' ? 'Member who joined' : 'Membro que entrou'}\n **{server}** - ${userLang === 'en' ? 'Server name' : 'Nome do servidor'}\n **{channel}** - ${userLang === 'en' ? 'To use the rules channel used on the server' : 'Para usar o canal de regras utilizado no servidor'}\n **{count}** - ${userLang === 'en' ? 'To show the number of members in the server!' : 'Para mostrar a quantidade de membros no servidor!'} `},
                    {name: `${userLang === 'en' ? 'Example of use' : 'Exemplo de uso'} ${emojis.emojis.stars}`, value: `${userLang === 'en' ? 'Hello {member}, welcome to the {server} server! Please read our rules in {channel} and have fun! We currently have {count} members!' : 'Olá {member}, seja muito bem-vindo(a) ao servidor {server}! Leia nossas regras em {channel} e divirta-se! Atualmente temos {count}° membros!'}`},
                    {name: `${userLang === 'en' ? 'Note' : 'Observação'} ${emojis.emojis.warn}`, value: `${userLang === 'en' ? 'By default, the welcome message is set in Brazilian Portuguese. We recommend that if you speak English, you change the default message to one defined by you.' : 'Por padrão a mensagem de boas-vindas está definida na linguagem português do Brasil, recomendamos que caso você fale inglês altere a mensagem padrão por uma definida por você.'}`}
                )
                .setColor('#5f9ea0')
                .setFooter({text: `${userLang === 'en' ? 'Type "cancel" to cancel the operation.' : 'Digite "cancelar" para cancelar a operação.'}`, iconURL: interaction.user.displayAvatarURL()})
                ],
                ephemeral: true}).catch(() => { });
            const filter = (m) => m.author.id === interaction.user.id;
            await interaction.channel.awaitMessages({filter: filter, max: 1}).then(async (received) => {
                received.first().delete().catch(() => { });
                const message = received.first().content.substr(0, 256);
                if (message.toLowerCase() === "cancelar" || message.toLowerCase() === "cancel") {
                    return interaction.editReply({
                         embeds: [
                            new Discord.EmbedBuilder()
                            .setDescription(`${emojis.emojis.incorrect} | ${interaction.user}, ${userLang === 'en' ? 'change canceled.' : 'alteração cancelada.'}`)
                            .setColor('#5f9ea0')
                        ]
                    });
                };
                await Guild.updateOne({_id: interaction.guild.id}, {
                    $set: {
                        welcomeMessage: message
                    }
                })
                interaction.editReply({content: `${userLang === 'en' ? `Your message has been successfully changed to **${message}**!` : `Sua mensagem foi alterada para **${message}** com sucesso!`}`,embeds: [], ephemeral: true});
            });
        }

        if(args[1] === "alterarMsgLeave"){
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                    .setTitle(`${emojis.emojis.list2} | ${userLang === 'en' ? 'Changing leave message' : 'Alterando mensagem de saída'}`)
                    .addFields(
                        {name: `${userLang === 'en' ? 'Current message' : 'Mensagem atual'} ${emojis.emojis.leave}`, value: `${guildId.leaveMessage ?? `${emojis.emojis.leave} | **{member}** saiu do nosso servidor! Espero que um dia ele volte para se divertir conosco novamente!}`}`, inline: true},
                        {name: `${userLang === 'en' ? 'How to change' : 'Como alterar'}? 🤔`, value: `${userLang === 'en' ? 'Please enter the new leave message in the chat.' : 'Digite a nova mensagem de saída no chat.'}`, inline: true},
                        {name: `${userLang === 'en' ? 'Keywords': 'Palavras chaves'} ${emojis.emojis.key}`, value: `**{member}** - ${userLang === 'en' ? 'Member who left' : "Membro que saiu"}\n **{server}** - ${userLang === 'en' ? 'Server name' : "Nome do Servidor"}\n **{count}** - ${userLang === 'en' ? 'To show the number of members in the server!' : 'Para mostrar a quantidade de membros no servidor!'} `},
                        {name: `${userLang === 'en' ? 'Example of use' : 'Exemplo de uso'} ${emojis.emojis.stars}`, value: `${userLang === 'en' ? 'Goodbye {member}, I hope you come back someday... We now have {count} members!' : 'Xauzinho {member}, espero que algum dia você ainda volte... Agora temos {count} membros!'}`},
                        {name: `${userLang === 'en' ? 'Note' : 'Observação'} ${emojis.emojis.warn}`, value: `${userLang === 'en' ? 'By default, the welcome message is set in Brazilian Portuguese. We recommend that if you speak English, you change the default message to one defined by you.' : 'Por padrão a mensagem de boas-vindas está definida na linguagem português do Brasil, recomendamos que caso você fale inglês altere a mensagem padrão por uma definida por você.'}`}
                    )
                    .setColor('#5f9ea0')
                    .setFooter({text: `${userLang === 'en' ? 'Type "cancel" to cancel the operation.' : 'Digite "cancelar" para cancelar a operação.'}`, iconURL: interaction.user.displayAvatarURL()})
                ],ephemeral: true}).catch(() => { });
            const filter = (m) => m.author.id === interaction.user.id
            await interaction.channel.awaitMessages({filter: filter,max: 1}).then(async (received) => {
                received.first().delete().catch(() => { });
                const message = received.first().content.substr(0, 256);
                if (message.toLowerCase() === "cancelar" || message.toLowerCase() === "cancel") {
                    return interaction.editReply({
                        embeds: [
                            new Discord.EmbedBuilder()
                            .setDescription(`${emojis.emojis.incorrect} | ${interaction.user}, ${userLang === 'en' ? 'change canceled.' : 'alteração cancelada.'}`)
                            .setColor('#5f9ea0')
                        ]
                    });
                };
                await Guild.updateOne({_id: interaction.guild.id}, {
                    $set: {
                        leaveMessage: message
                    }
                })
                interaction.editReply({content: `${userLang === 'en' ? `Your message has been successfully changed to **${message}**!` : `Sua mensagem foi alterada para **${message}** com sucesso!`}`, embeds: [], ephemeral: true});
            });
        }

        if(args[1] === "msgAtual"){
            const embed = new Discord.EmbedBuilder()
            .setTitle(`${userLang === 'en' ? 'Current messages' : 'Mensagens atuais'} ${emojis.emojis.list2}`)
            .addFields(
                {name: `${userLang === 'en' ? 'Welcome message' : 'Mensagem de boas-vindas'} ${emojis.emojis.join}`, value: `${guildId.welcomeMessage ?? `${emojis.emojis.join} Boas-vindas ao servidor! \n ${emojis.emojis.announcement} Leia as nossas ${interaction.guild.rulesChannelId === null ? 'regras' : `<#${interaction.guild.rulesChannelId}>`} para viver de bem conosco!\n${emojis.emojis.escudo} Precisa de ajuda? Entre em contato com a equipe do servidor!`}`},
                {name: `${userLang === 'en' ? 'Leave message' : 'Mensagem de saída'} ${emojis.emojis.leave}`, value: `${guildId.leaveMessage ?? `${emojis.emojis.leave} | **{member}** saiu do nosso servidor! Espero que um dia ele volte para se divertir conosco novamente!`}`}
            )
            .setColor('#5f9ea0')
            interaction.reply({components: [], embeds: [embed], ephemeral: true});
        }

        if(args[1] === 'voltar'){
            const texts2 = {
                br: {
                    none: "Nenhum",
                    msgPrincipal: "Configure tudo o que o seu servidor precisa para tornar-se mais organizado e seguro!",
                },
                en: {
                    none: "None",
                    msgPrincipal: "Set up everything your server needs to become more organized and secure!"
                }
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
    
            const canal = guildId.channel ?? `${texts2[userLang].none}`
            const canalLogs = guildId.channelLogs ?? `${texts2[userLang].none}`
            const statusAntilink = guildId.antilink
            const cargo = guildId.role.id ?? `${texts2[userLang].none}`
    
            const embed = new Discord.EmbedBuilder()
            .setTitle(`${emojis.emojis.config} | Painel de configuração`)
            .addFields(
                {
                    name: `${userLang === 'en' ? "Configure your server" : "Configure o seu servidor 🔧"}`,
                    value: `${texts2[userLang].msgPrincipal}`,
                    inline: true,
                },
                {
                    name: `${userLang === 'en' ? 'Reception channel' : 'Canal de recepção'} ${emojis.emojis.join}`,
                    value: `${canal == "Nenhum" || "None" ? `${texts2[userLang].none}` : `<#${canal}>`}`,
                    inline: false,
                },
                {
                    name: `${userLang === 'en' ? 'Log channel' : 'Canal de logs'} ${emojis.emojis.anonime}`,
                    value: `${canalLogs == "Nenhum" || "None" ? `${texts2[userLang].none}` : `<#${canalLogs}>`}`,
                    inline: true,
                },
                {
                    name: `Antilink ${emojis.emojis.link}`,
                    value: `${statusAntilink ? `${emojis.emojis.on}` : `${emojis.emojis.off}`}`,
                    inline: true,
                },
                {
                    name: `Autorole ${emojis.emojis.medal}`,
                    value: `${cargo == "Nenhum" || "None" ? `${texts2[userLang].none}` : `<@&${cargo.replace("-", "><@&")}>`}`,
                    inline: true,
                }
            )
            .setThumbnail("https://cdn.discordapp.com/attachments/1187881183611207850/1214369098801217557/dashboard.png?ex=65f8dc5b&is=65e6675b&hm=e83ac684fa552d88c14fcd34a942bfee08c9fa8846761f1e65c06161c392fd6b&")
            .setImage("https://cdn.discordapp.com/attachments/1197555203965198377/1223807999232053328/Captura_de_Tela_2024-03-30_as_22.28.41.png?ex=661b3304&is=6608be04&hm=f2dcd87586966c32e7ad450319d9ad7e2153f674d9f7814ed1f6e16c866710a1&")
            .setColor("#5f9ea0");
            interaction.update({
                content: '',
                embeds: [embed],
                components: [rowOpcoes],
            });
        }
    }
}