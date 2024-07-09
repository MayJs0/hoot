const Guild = require('../../Schemas/guilds');
const emojis = require('../../assets/emojis.json');
const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "modalGiveaway",
  execute: async ({client, interaction, userdb}) => {
    const channel = interaction.fields.getTextInputValue(`canal`) || interaction.channel.id;
    const canal = client.channels.cache.get(channel);
    const descrição = interaction.fields.getTextInputValue(`descrição`);
    const premio = interaction.fields.getTextInputValue(`premio`);
    const tempo = interaction.fields.getTextInputValue(`tempo`);
    const ganhadores = interaction.fields.getTextInputValue(`ganhadores`);

    const userLang = userdb.language
    const messages = {
        br: {
            timerIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, coloque um tempo válido!`,
            winnersIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, coloque um número válido de ganhadores!`,
            timeIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, coloque alguma letra no tempo! Ex: **1d, 1m, 1s**`,
            channelIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, coloque um canal válido!`,
            giveawayCreated: `${emojis.emojis.correct} | ${interaction.user.username}, o sorteio com o prêmio \`${premio}\` foi criado com sucesso!`
        },
        en: {
            timerIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, put a valid time!`,
            winnersIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, put a valid number of winners!`,
            timeIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, put some letter in the time! Ex: **1d, 1m, 1s**`,
            channelIncorrect: `${emojis.emojis.incorrect} | ${interaction.user.username}, put a valid channel!`,
            giveawayCreated: `${emojis.emojis.correct} | ${interaction.user.username}, the giveaway with the prize \`${premio}\` was created successfully!`
        }
    }
    if(tempo <= "0s" || tempo <= "0m" || tempo <= "0y" || tempo <= "0m"|| tempo <= "0w") return await interaction.reply({content: `${messages[userLang].timerIncorrect}`, ephemeral: true});
    if(isNaN(ganhadores) || ganhadores <= 0) return await interaction.reply({content: `${messages[userLang].winnersIncorrect}`, ephemeral: true});
    if (!["s", "m", "y" , "d"].some(element => tempo.includes(element))) return await interaction.reply({content: `${messages[userLang].timeIncorrect}`, ephemeral: true});
    const duration = Math.round((Date.now() + (ms(tempo) || 0)) / 1000);
    if(!canal) return await interaction.reply({content: `${messages[userLang].channelIncorrect}`, ephemeral: true})

    await interaction.reply({content: `${messages[userLang].giveawayCreated}`,ephemeral: true,});
    client.m.delete(); // delete the message

    const embed = new Discord.EmbedBuilder()
    .setTitle(`${emojis.emojis.stars} | Giveaway`)
    .setColor("#5f9ea0")
    .setDescription(`${descrição}\n\n${emojis.emojis.stars} Prize: **${premio}**\n${emojis.emojis.medal} Winners: ${parseInt(ganhadores)}\n${emojis.emojis.timer} Timer: <t:${duration}:R>\n\nJoin by clicking on "🎉"`)
    .setTimestamp(Date.now() + ms(tempo))
    .setFooter({text: `Created by ${interaction.user.username} | Ends`, iconURL: `${interaction.user.displayAvatarURL()}`})
    .setImage("https://cdn.discordapp.com/attachments/1187881183611207850/1234289211142701128/Captura_de_Tela_2024-04-28_as_20.44.33.png?ex=663030e7&is=662edf67&hm=ef0bd585e9136061fc80ecda8a2a8333f95e7591ede534dc1cbc4ef59dccd3f4&")
    .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
    canal.send({ embeds: [embed] }).then(async (message) => {
        message.react("🎉");
        setTimeout(async () => {
            let array = [];
            var users = message.reactions.cache.get("🎉").users.cache.filter((user) => !user.bot);
            for (let i = 0; i < ganhadores && i < users.size; i++) {
                const ganhador = users.random();
                if (array.includes(ganhador.id)) {
                    return;
                } else {
                    array.push(ganhador.id);
                }
            }
            if (users.size > 0) {
                const embedgg = new Discord.EmbedBuilder()
                .setTitle(`${emojis.emojis.stars} | Giveaway`)
                .setColor("#5f9ea0")
                .setDescription(`\n${descrição}\n\n${emojis.emojis.stars} Prize: **${premio}**\n${emojis.emojis.medal} Winners: ${parseInt(ganhadores)}\n${emojis.emojis.timer} Finished: <t:${~~(Date.now() / 1000)}:R>\n${emojis.emojis.members} Winners: <@${array.join('>, <@')}>`)
                .setTimestamp(Date.now())
                .setFooter({ text: "Giveaway concluded" })
                .setImage("https://cdn.discordapp.com/attachments/1187881183611207850/1234290444054040588/Captura_de_Tela_2024-04-28_as_20.49.27.png?ex=6630320d&is=662ee08d&hm=905a78af8428c064b0ad7921fc99121532a7dc850a3f07b3566fae14ba41f41e&")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
                message.edit({ embeds: [embedgg] }).then(() => {
                    message.reply(`${emojis.emojis.stars} | Congratulations <@${array.join('>, <@')}>, you won the giveaway with the prize: \`${premio}\`!`);
                });
            } else {
                const embedf = new Discord.EmbedBuilder()
                .setTitle(`${emojis.emojis.stars} | Giveaway`)
                .setColor("#5f9ea0")
                .setDescription(`\n${descrição}\n\n${emojis.emojis.stars} Prize: **${premio}**\n${emojis.emojis.timer} Finished: <t:${~~(Date.now() / 1000)}:R>\n${emojis.emojis.incorrect} Winners: \`No one\``)
                .setTimestamp(Date.now())
                .setFooter({ text: "Giveaway concluded" })
                .setImage("https://cdn.discordapp.com/attachments/1187881183611207850/1234290444054040588/Captura_de_Tela_2024-04-28_as_20.49.27.png?ex=6630320d&is=662ee08d&hm=905a78af8428c064b0ad7921fc99121532a7dc850a3f07b3566fae14ba41f41e&")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }));
                message.edit({ embeds: [embedf] }).then(() => {
                    message.reply(`${emojis.emojis.warn} | This giveaway has been canceled, there were no participants.`);
                });
            }
            await Guild.updateOne({ _id: message.guild.id },{
                $unset: {
                    [`giveaway.${message.id}`]: 1,
                },
            });
        }, ms(tempo));
        await Guild.updateOne({ _id: message.guild.id },{
            $set: {
                [`giveaway.${message.id}`]: {
                    premio: premio,
                    timestamp: Date.now() + ms(tempo),
                    channelId: message.channel.id,
                    messageId: message.id,
                    guildId: message.guild.id,
                    miliseconds: ms(tempo),
                    description: descrição,
                    winners: parseInt(ganhadores),
                },
            },
        });
    });
  },
};