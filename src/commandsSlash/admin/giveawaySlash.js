const Discord = require("discord.js");
const emojis = require("../../../assets/emojis.json");
module.exports = {
  name: "giveaway",
  description: "｢Moderation｣ Create a cool giveaway for your server!",
  requiredDb: true,
  run: async ({client, interaction, userdb}) => {
    const userLang = userdb.language;
    // !message.guild.members.me.permissions.has('SendMessages')
    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageEvents)) return interaction.reply(`<:avisos:1194279514990198886> | ${interaction.user}, você não tem a permissão de \`Gerenciar Eventos\`!`);
    if (!interaction.guild.members.me.permissions.has(Discord.PermissionFlagsBits.SendMessages) &&!interaction.guild.members.me.permissions.has(Discord.PermissionFlagsBits.AddReactions))return interaction.reply(`<:avisos:1194279514990198886> | ${interaction.user}, eu não possuo as seguintes permissões: \`Enviar Mensagens\` e \`Adicionar reações\`!`);

    const messages = {
        br: {
            questions: "as perguntas são bem fáceis de serem respondidas. Sendo elas: **ID do canal do sorteio (opcional)**, **Descrição sobre o sorteio**, **Prêmio do sorteio**, **Duração do sorteio (Ex: 10s, 2m, 3d...)** e a quantidade de ganhadores.",
            createGiveaway: `Clique no botão abaixo para abrir um formulário com as perguntas citadas acima!`
        },
        en: {
            questions: "the questions are quite easy to answer. They are: **Giveaway channel ID (optional)**, **Description of the giveaway**, **Giveaway prize**, **Duration of the giveaway (e.g., 10s, 2m, 3d...)**, and the number of winners.",
            createGiveaway: `Click the button below to open a form with the questions mentioned above!`
        }
    }
    const embed = new Discord.EmbedBuilder()
    .setTitle(`🤗 | ${userLang === 'en' ? "Are you ready to create the giveaway?" : "Preparado(a) para criar o sorteio?"}`)
    .addFields(
        {name: `${userLang === 'en' ? 'Questions' : 'Perguntas'} 🔍`, value: `${interaction.user}, ${messages[userLang].questions}`,inline: true},
        {name: `${userLang === 'en' ? 'Create it right now!' : 'Crie agora mesmo!'} 🎉`, value: `${messages[userLang].createGiveaway}`,inline:true}
      )
    .setColor("#5f9ea0")
    .setImage("https://cdn.discordapp.com/attachments/1197555203965198377/1223964250972618792/Captura_de_Tela_2024-03-31_as_08.56.49.png?ex=661bc489&is=66094f89&hm=998a85d26edc77b349ee659cd18c6328e5b08b71fb581e9b1311eaa1508c7f24&");
    const botao1 = new Discord.ButtonBuilder()
    .setLabel(`${userLang === 'en' ? "Create" : "Criar"}`)
    .setCustomId("criar")
    .setStyle(Discord.ButtonStyle.Secondary)
    .setEmoji(emojis.emojis.stars);

    const row = new Discord.ActionRowBuilder().addComponents(botao1);
    const msg = await interaction.reply({embeds: [embed],components: [row]});
    client.m = msg;

    const collector = msg.createMessageComponentCollector();
    collector.on("collect", async (i) => {
        if (i.customId !== "criar") return;
        if (i.user.id !== interaction.user.id) return;

        const modal = new Discord.ModalBuilder()
        .setCustomId("modalGiveaway")
        .setTitle("Giveaway");

        const channelInput = new Discord.TextInputBuilder()
        .setCustomId("canal")
        .setLabel("Channel ID")
        .setPlaceholder(`${userLang === 'en' ? "Leave blank to conduct the giveaway in the current channel" : "Deixe vazio para o sorteio ser feito no canal atual"}`)
        .setRequired(false)
        .setStyle(Discord.TextInputStyle.Short);

        const descriptionInput = new Discord.TextInputBuilder()
        .setCustomId("descrição")
        .setLabel("Description")
        .setPlaceholder(`${userLang === 'en' ? "Describe what your giveaway is about" : "Descreva sobre o que é o seu sorteio"}`)
        .setStyle(Discord.TextInputStyle.Paragraph);

        const winnersInput = new Discord.TextInputBuilder()
        .setCustomId("ganhadores")
        .setLabel("Winners")
        .setPlaceholder("1, 2, 3...")
        .setRequired(true)
        .setStyle(Discord.TextInputStyle.Short);

        const prizeInput = new Discord.TextInputBuilder()
        .setCustomId("premio")
        .setLabel("Prize")
        .setPlaceholder(`${userLang === 'en' ? "What is the prize?" : "Qual é o prêmio?"}`)
        .setStyle(Discord.TextInputStyle.Paragraph);

        const timerInput = new Discord.TextInputBuilder()
        .setCustomId("tempo")
        .setLabel("Timer")
        .setPlaceholder("1m, 1h, 1d, 1y...")
        .setStyle(Discord.TextInputStyle.Short);

        const channel = new Discord.ActionRowBuilder().addComponents(channelInput);
        const description = new Discord.ActionRowBuilder().addComponents(descriptionInput);
        const prize = new Discord.ActionRowBuilder().addComponents(prizeInput);
        const winners = new Discord.ActionRowBuilder().addComponents(winnersInput);
        const timer = new Discord.ActionRowBuilder().addComponents(timerInput);

        modal.addComponents(channel, description, prize, winners,timer);
        await i.showModal(modal);
    });
  },
};