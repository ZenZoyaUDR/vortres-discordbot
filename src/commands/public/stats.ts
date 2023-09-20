import { SlashCommandBuilder } from "discord.js";
import prisma from "../../lib/prisma";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("See other player's stats or your own!")
    .addStringOption((option) => {
      option
        .setName("player")
        .setDescription("Get the Information about a Player")
        .setRequired(true);
      return option;
    }),

  async execute(interaction: any, client: any) {
    const sent = await interaction.reply({
      content: "<a:loading:1069476742571511860> Loading...",
      fetchReply: true,
    });
    const playerStats = await prisma.player.findFirst({
      where: { username: interaction.options.getString("player") },
    });
    if (!playerStats) {
      return interaction.editReply({
        content: "Player not found",
      });
    }

    let statsEmbed = {
      description: `Here is **${playerStats.username}**'s stats.`,
      fields: [
        {
          name: `Player Level`,
          value: `**${playerStats.level}**`,
          inline: true,
        },
        {
          name: `Player XP`,
          value: `**Null**`,
          inline: true,
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
