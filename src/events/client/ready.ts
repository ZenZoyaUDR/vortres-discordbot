import { logger } from "../../helpers/logger";
const log = logger({ name: "Event: Ready" });

module.exports = {
  name: "ready",
  once: false,

  execute(client: any) {
    log.info(`Logged-in as ${client.user.tag}`);
  },
};
