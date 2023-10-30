const { log } = require("../../lib/logger");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (err) {
      log.error(`An error has occurred: (see blow)\n${err}\n`);
      if (interaction.replied || interaction.deferred) {
		await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
	  } else {
	    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	  }
    }
  },
};
