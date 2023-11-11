const colors = require("console-log-colors");
const { log } = require("../../lib/logger");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      log.info(
        `${colors.grey(
          `[Command: ${colors.blue(
            `${interaction.commandName}`
          )} - ${colors.green(`Success`)}] by ${colors.white(
            `${interaction.user.username}#${interaction.user.discriminator}`
          )} in ${colors.yellow(
            `${interaction.guild ? interaction.guild.name : "(DM)"}`
          )}`
        )}`
      );
      await command.execute(interaction, client);
    } catch (error) {
      log.error(`An error has occurred: (See blow)\n${error}\n(end of report)`);
    }
  },
};
