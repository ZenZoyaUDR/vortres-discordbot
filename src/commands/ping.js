const { SlashCommandBuilder } = require('discord.js');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('ping')
          .setDescription('Get the Bot connection speed.'),
     async execute(interaction, client) {
          let embed = {
               description: `🏓 Latency: \`${Math.round(client.ws.ping)} ms\``,
          }
          interaction.reply({ embeds: [embed] });
     },
};
