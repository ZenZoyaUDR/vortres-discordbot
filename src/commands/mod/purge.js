const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete messages in the channel')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Amount of messages to delete')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('Delete messages from pesific user')
    ),

  async execute(interaction, client) {
    const { channel, options } = interaction;

    const amount = options.getInteger('amount');
    const user = options.getUser('user');

    if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages) || interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      const messages = await channel.messages.fetch({ limit: amount });
      if(user) {
          let i = 0;
          const filtered = [];

          (await messages).filter((msg) => {
              if(msg.author.id = user.id && amount > i) {
                  filtered.push(msg);
                  i++;
              }
          });
          await channel.bulkDelete(filtered).then(mesaages => {
            let cmdMsg = {
                description: `Successfully purge \`${messages.size}\` messages from \`${user.tag}\`.`,
                color: client.color.blue,
            }
            interaction.reply({ embeds: [cmdMsg] });
          });
      } else {
          await channel.bulkDelete(amount, true).then(mesaages => {
            let cmdMsg = {
                description: `Successfully purge \`${messages.size}\` messages from the channel.`,
                color: client.color.blue,
            }
            interaction.reply({ embeds: [cmdMsg] });
          });
      }
    } else {
      let cmdDeny = {
        description: `You need to have permission \`MANAGE_MESSAGES\` to use this command.`,
        color: client.color.yellow,
      }
      return interaction.reply({ embeds: [cmdDeny] });
    }
  }
};
