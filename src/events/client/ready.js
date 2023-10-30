const { log } = require("../../lib/logger");

module.exports = {
  name: "ready",
  once: false,

  async execute(client) {
    log.info(`Logged-in as ${client.user.tag}`);
  },
};
