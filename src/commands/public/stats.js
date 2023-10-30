const { SlashCommandBuilder } = require("discord.js");
const { log } = require("../../lib/logger");
const sql = require("../../lib/mysql");

module.exports = {
  name: "stats",
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("See other player's stats or your own!")
    .addStringOption((option) =>
      option
        .setName("player")
        .setDescription("See player statistics")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    let player = interaction.options.getString("player");
    const sent = await interaction.reply({
      content: "<a:loading:1069476742571511860> Loading...",
      fetchReply: true,
    });
    let result = await sql.execute(
      `SELECT * FROM Player WHERE username = \"${player}\"`
    );
    if (result.length == 0) {
      log.debug(result);
      let errorEmbed = {
        description: `\`${player}\` does not exist on our database!`,
        color: client.color.red,
      };
      return interaction.editReply({ content: "", embeds: [errorEmbed] });
    }

    let statsEmbed = {
      description: `**${result[0].username}**'s Stats`,
      fields: [
        {
          name: `Player Level`,
          value: `\`${result[0].level}\``,
          inline: false,
        },
        {
          name: `Player XP`,
          value: `\`${result[0].exp}\``,
          inline: false,
        },
      ],
      footer: {
        text: `Query took ${
          sent.createdTimestamp - interaction.createdTimestamp
        }ms.`,
      },
      color: client.color.blue,
    };
    interaction.editReply({ content: "", embeds: [statsEmbed] });
  },
};
