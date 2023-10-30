const { log } = require("../lib/logger");
const fs = require("fs");

async function loadCommands(client) {
  let commandsArray = [];

  const commandsFolder = fs.readdirSync("./src/commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../../src/commands/${folder}/${file}`);

      client.commands.set(commandFile.data.name, commandFile);
      commandsArray.push(commandFile.data.toJSON());
    }
  }
  client.application.commands.set(commandsArray);
  return log.info(`Loaded ${commandsArray.length} commands`);
}

module.exports = { loadCommands };
