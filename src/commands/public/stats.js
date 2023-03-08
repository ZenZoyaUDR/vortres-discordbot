const sql = require('../../database/mysql.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('stats')
          .setDescription('See your stats or someone else\'s stats')
          .addStringOption(option => option.setName('player').setDescription('The player you want to see the stats of').setRequired(true)),

     async execute(interaction, client) {
          const player = interaction.options.getString('player');
          let result = await sql.Execute(`SELECT * FROM Player_Stats WHERE username = '${player}'`);
          if (result.length == 0) return interaction.reply({ content: `${player} doesn\'t exist in the database.` })

          let statsEmbed = {
               title: `${player}\'s Stats`,
               description: `**Level:** ${result[0].level}\n**XP:** ${result[0].exp}/${result[0].maxExp}`,
               color: client.color.blue,
          }
          interaction.reply({ content: '', embeds: [statsEmbed] });
     },
};
