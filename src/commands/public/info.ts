import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get the Information about the Bot"),

  async execute(interaction: any, client: any) {
    const sent = await interaction.reply({
      content: "<a:loading:1069476742571511860> Lodading...",
      fetchReply: true,
    });
    let infoEmbed = {
      description: `Here is the information`,
      fields: [
        {
          name: `Library Used`,
          value: `Discord.js`,
          inline: true,
        },
        {
          name: `Bot Creator`,
          value: `@zenzoya`,
          inline: true,
        },
      ],
      color: client.color.blue,
    };
    interaction.editReply({ content: "", embeds: [infoEmbed] });
  },
};
