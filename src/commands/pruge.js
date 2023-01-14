const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pruge')
    .setDescription('Delete the last X amount of messages')
    .addNumberOption(opt => opt.setName('amount').setDescription('Amount of messages to delete').setRequired(true)),
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');

    if (amount < 1 || amount > 99) {
      let cmdFormatError = {
        description: `You only can delete \`1 to 99\` messages at a time.`,
        color: client.color.fail,
      }
      return interaction.reply({ embeds: [cmdFormatError], ephemeral: true });
    }
    await interaction.channel.bulkDelete(amount, true).catch(err => {
      console.error('\n\nAn error has occured:\n', err, '\n\n');
      let cmdError = {
        description: `There was an error while executing this command!\n\n**Error:**\n\`\`\`${err}\`\`\``,
        color: client.color.fail,
      }
      return interaction.reply({ embeds: [cmdError], ephemeral: true });
    });
    let cmdSuc = {
      description: `Successfully purge \`${amount}\` messages.`,
      color: client.color.fail,
    }
    return interaction.reply({ embeds: [cmdSuc] });
  },
};
