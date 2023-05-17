const { SlashCommandBuilder } = require('discord.js');
const sql = require('../../database/mysql.js');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('stats')
          .setDescription('See your stats or someone else\'s stats')
          .addStringOption(option =>
               option
                    .setName('player')
                    .setDescription('In game username (include "." for bedrock)')
                    .setRequired(true)
          ),

     async execute(interaction, client) {
          const player = interaction.options.getString('player');
          if (player.includes("*")) { var skin = "Zenoffire" } else { var skin = player }
          await interaction.reply({ content: '<a:loading:1069476742571511860> Fetching...', fetchReply: true });

          let result = await sql.Execute(`SELECT * FROM Player_Stats WHERE username = '${player}'`);
          let playerNotFoundEmbed = {
               description: `\`${player}\` was not found in the database.`,
               color: client.color.red
          }
          if (result.length == 0) return interaction.editReply({ content: '', embeds: [playerNotFoundEmbed] });

          let playerStatsEmbed = {
               description: `LEVEL: \`${result[0].level}\``,
               color: client.color.blue
          }
          return interaction.editReply({ content: '', embeds: [playerStatsEmbed] });
     },
};
