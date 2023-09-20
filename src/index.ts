// Import
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const env = require("dotenv").config().parsed;

// Constants
const { loadEvents } = require("./handler/eventHandler");
const { loadCommands } = require("./handler/commandHandler");
const { logger } = require("./helpers/logger");
const log = logger({ name: "Main" });

// Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.commands = new Collection();

// Helpers
client.color = require("./helpers/color");

// Login
client.login(env.BOT_TOKEN).then(() => {
  console.clear();
  log.info("Starting the Bot...");

  // Run functions
  log.info("Loading Handlers...");
  loadEvents(client);
  loadCommands(client);
});
