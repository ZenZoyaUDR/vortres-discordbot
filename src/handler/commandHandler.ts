import {
  Client,
  Collection,
  ApplicationCommandDataResolvable,
} from "discord.js";
import { logger } from "../helpers/logger";
const log = logger({ name: "Handler: Ready" });

interface Command {
  data: {
    name: string;
    description: string;
    options?: any[];
  };
}

interface CustomClient extends Client {
  commands: Collection<string, Command>;
}

export function loadCommands(client: CustomClient) {
  const fs = require("node:fs");

  let commandsArray: ApplicationCommandDataResolvable[] = [];

  const commandsFolder = fs.readdirSync("./src/commands");
  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./src/commands/${folder}`)
      .filter((file: string) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const commandFile = require(`../../src/commands/${folder}/${file}`);

      (client.commands as Collection<string, Command>).set(
        commandFile.data.name,
        commandFile
      );
      commandsArray.push(commandFile.data);
    }
  }
  if (client.application) {
    client.application.commands.set(commandsArray);
  }
  return log.info("Commands loaded");
}

module.exports = { loadCommands };
