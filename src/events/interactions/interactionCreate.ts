import { logger } from "../../helpers/logger";
const log = logger({ name: "Event: Interaction" });

module.exports = {
  name: "interactionCreate",

  async execute(interaction: any, client: any) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction, client);
    } catch (err) {
      log.error(`Error executing command: ${command.name}`);
      log.error(`${err}\n`);
    }
  },
};
