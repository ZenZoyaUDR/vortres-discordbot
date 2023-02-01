const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Get the Bot, and API connection speed'),

  async execute(interaction, client) {
    const sent = await interaction.reply({ content: '<a:loading:1069476742571511860> Pinging...', fetchReply: true });
    let pingEmbed = {
      description: `Here is the connection speed data.`,
      fields: [{
        name: `Bot Latency`,
        value: `**${sent.createdTimestamp - interaction.createdTimestamp}ms**`,
        inline: true
      },
      {
        name: `API Latency`,
        value: `**${Math.round(client.ws.ping)}ms**`,
        inline: true
      }],
      color: client.color.yellow,
    }
    interaction.editReply({ content: '', embeds: [pingEmbed] });
  },
};