const {
  SlashCommandBuilder,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");

module.exports = {
  name: "say",
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Say someting as a bot")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to say")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to echo into")
        // Ensure the user can only select a TextChannel for output
        .addChannelTypes(ChannelType.GuildText)
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
      channel.send({ content: `${msg}` });
      interaction.reply({ content: "Done", ephemeral: true });
    } else {
      let cmdDeny = {
        description: `You need to have permission \`MANAGE_MESSAGES\` to use this command.`,
        color: client.color.yellow,
      };
      return interaction.reply({ embeds: [cmdDeny] });
    }
  },
};
