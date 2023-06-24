const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say someting as a bot")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The masaage to say")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to say into")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const msg = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel");

    if (
      interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      ) ||
      interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      // check if the channel is a text channel
      if (channel.type !== "GUILD_TEXT") {
        let cmdErr = {
          description: `You need to select a text channel to use this command.`,
          color: client.color.yellow,
        };
        interaction.reply({ embeds: [cmdErr], ephemeral: true });
      } else {
        return channel.send({ content: `${msg}` });
      }
    } else {
      let cmdDeny = {
        description: `You need to have permission \`MANAGE_MESSAGES\` to use this command.`,
        color: client.color.yellow,
      };
      return interaction.reply({ embeds: [cmdDeny] });
    }
  },
};
