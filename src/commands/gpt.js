const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gpt-start')
    .setDescription('start chatting with AI, memory is enabled!'),
  async execute(interaction, client) {
    let embed = {
      title: 'Bot Latency',
      description: `🏓 Latency: \`${Math.round(client.ws.ping)} ms\`. This command is not ready yet.`,
      color: client.color.yellow,
    }
    interaction.reply({ embeds: [embed] });
  },
};
