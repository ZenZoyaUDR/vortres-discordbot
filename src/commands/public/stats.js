const { ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require("discord.js");
const { log } = require("../../lib/logger");
const redis = require("../../lib/redis");
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
    await interaction.deferReply();

    let queryStart = performance.now();
    let result = await redis.get(`stats:${player}`);
    let isCachehit;
    if (result == null) {
      isCachehit = false;
      result = await sql.execute(
        `SELECT * FROM Player WHERE username = \"${player}\"`
      );
      await redis.set(`stats:${player}`, JSON.stringify(result));
      await redis.expire(`stats:${player}`, 60 * 2);
    } else {
      isCachehit = true;
      result = JSON.parse(result);
    }
    let queryEnd = performance.now();
    let queryTime = Math.round(queryEnd - queryStart).toFixed(2);

    // If the player doesn't exist
    if (result.length == 0) {
      return interaction.reply({
        content: `Player \`${player}\` does not exist!`,
        ephemeral: true,
      });
    }

    // send the embed
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
        // user image
        icon_url: interaction.user.avatarURL(),
        text: `Query took ${queryTime}ms. Cache hit? ${isCachehit}.| Requested by ${interaction.user.username}`,
      },
      color: client.color.blue,
    };
    interaction.editReply({ content: "", embeds: [statsEmbed] });

    // let statsEmbed = {
    //   description: `**${result[0].username}**'s Stats`,
    //   fields: [
    //     {
    //       name: `Player Level`,
    //       value: `\`${result[0].level}\``,
    //       inline: false,
    //     },
    //     {
    //       name: `Player XP`,
    //       value: `\`${result[0].exp}\``,
    //       inline: false,
    //     },
    //   ],
    //   footer: {
    //     text: `Query took ${queryTime}ms.`,
    //   },
    //   color: client.color.blue,
    // };
    // interaction.editReply({ content: "", embeds: [statsEmbed] });
  },
};
