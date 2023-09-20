import { logger } from "../helpers/logger";
const log = logger({ name: "Handler: Ready" });

export function loadEvents(client: any) {
  const fs = require("node:fs");

  const folders = fs.readdirSync("./src/events");
  for (const folder of folders) {
    const files = fs
      .readdirSync(`./src/events/${folder}`)
      .filter((file: any) => file.endsWith(".ts"));

    for (const file of files) {
      const event = require(`../../src/events/${folder}/${file}`);

      if (event.rest) {
        if (event.once)
          client.rest.once(event.name, (...args: any) =>
            event.execute(...args, client)
          );
        else
          client.rest.on(event.name, (...args: any) =>
            event.execute(...args, client)
          );
      } else {
        if (event.once)
          client.once(event.name, (...args: any) =>
            event.execute(...args, client)
          );
        else
          client.on(event.name, (...args: any) =>
            event.execute(...args, client)
          );
      }
    }
  }
  return log.info("Events loaded");
}
