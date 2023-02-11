const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say someting as a bot')
    .addStringOption(option =>
      option.setName('msg')
      .setDescription('The masaage to say')
      .setRequired(true));
    .addChannelOption(option =>
      option.setName('channel')
      .setDescription('The channel to say into')
      .setRequired(true));
    ),

  async execute(interaction, client) {
    const msg = interaction.options.getString('msg');
    const channel = interaction.options.getChannel('channel');

    if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return channel.reply({ content: `${msg}` });
    } else {
      let cmdDeny = {
        description: `You need to have permission \`MANAGE_MESSAGES\` to use this command.`,
        color: client.color.yellow,
      }
      return interaction.reply({ embeds: [cmdDeny] });
    }
  }
};