import {
  SlashCommandBuilder,
  PermissionsBitField,
  ChannelType,
} from "discord.js";

module.exports = {
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

  async execute(interaction: any, client: any) {
    const { Permissions } = require("discord.js");
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
    } else {
      let cmdDeny = {
        description: `You need to have permission \`MANAGE_MESSAGES\` to use this command.`,
        color: client.color.yellow,
      };
      return interaction.reply({ embeds: [cmdDeny] });
    }
  },
};
