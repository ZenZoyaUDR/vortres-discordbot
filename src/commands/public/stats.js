const sql = require('../../database/mysql.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('stats')
          .setDescription('See your stats or someone else\'s stats')
          .addStringOption(option => option.setName('player').setDescription('The player you want to see the stats of').setRequired(true)),

     async execute(interaction, client) {
          const player = interaction.options.getString('player');
          let result = await sql.Execute(`SELECT * FROM player_data WHERE name = '${player}'`);
          if (result.length == 0) return interaction.reply({ content: 'This player doesn\'t exist in the database.' })

          let statsEmbed = {
               description: `${player}\'s Stats.`,
               fields: [{
                    name: `Level`,
                    value: `**${result[0].level}**`,
                    inline: true
               },
               {
                    name: `XP`,
                    value: `**${result[0].xp}**`,
                    inline: true
               }],
               color: client.color.blue,
          }
          interaction.reply({ content: '', embeds: [statsEmbed] });
     },
};