import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Delete messages in the channel")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of messages to delete")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    ),

  async execute(interaction: any, client: any) {
    const { channel, options } = interaction;

    const amount = options.getInteger("amount");

    if (
      interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      ) ||
      interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    ) {
      await channel.bulkDelete(amount, true).then((messages: any) => {
        let cmdMsg = {
          description: `Successfully purge \`${messages.size}\` messages from the channel`,
          color: client.color.blue,
        };
        interaction.reply({ embeds: [cmdMsg] });
      });
    } else {
      let cmdDeny = {
        description: `You need to have permission \`MANAGE_MESSAGES\` to use this command.`,
        color: client.color.yellow,
      };
      return interaction.reply({ embeds: [cmdDeny] });
    }
  },
};
