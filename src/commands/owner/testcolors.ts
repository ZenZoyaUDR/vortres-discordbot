import { SlashCommandBuilder } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testcolors")
    .setDescription("For testing"),

  async execute(interaction: any, client: any) {
    let Embed1 = {
      description: `1`,
      color: client.color.invis,
    };
    let Embed2 = {
      description: `2`,
      color: client.color.blue,
    };
    let Embed3 = {
      description: `3`,
      color: client.color.yellow,
    };
    let Embed4 = {
      description: `4`,
      color: client.color.red,
    };
    interaction.reply({ embeds: [Embed1, Embed2, Embed3, Embed4] });
  },
};
