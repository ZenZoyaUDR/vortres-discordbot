const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "testcolors",
  data: new SlashCommandBuilder()
    .setName("testcolors")
    .setDescription("For testing"),

  async execute(interaction, client) {
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
