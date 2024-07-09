const {
    EmbedBuilder
  } = require("discord.js");
const emojis = require("../../../assets/emojis.json");
module.exports = {
    name: 'pokemon',
    description: "｢Diversão｣ Tente acertar o pokemon",
    run: async ({client, interaction}) => {
      const { GuessThePokemon } = require('discord-gamecord');
      const Game = new GuessThePokemon({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: '🤔 | Qual é o pokémon?',
          color: '#5f9ea0'
        },
        timeoutTime: 60000,
        winMessage: `${emojis.emojis.stars} ${interaction.user}, parabéns você acertou o pokémon! O pokémon era **{pokemon}**.`,
        loseMessage: `${emojis.emojis.incorrect} | ${interaction.user}, você errou o pokemon! O pokemon correto era o **{pokemon}**.`,
        errMessage: `${emojis.emojis.warn} | ${interaction.user}, ops! um erro inesperado aconteceu... Tente novamente!`,
        playerOnlyMessage: `${emojis.emojis.warn} | Apenas o {player} pode utilizar os botões!`
      });
      Game.startGame();
    }
}