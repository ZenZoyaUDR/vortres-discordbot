// Import
require("dotenv").config();
const { loadEvents } = require("./handler/eventHandler");
const { loadCommands } = require("./handler/commandHandler");
const { Client, GatewayIntentBits, Collection } = require("discord.js");

// Env
const { BOT_TOKEN } = process.env;

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
client.color = require("./helpers/colorHelper");

client.login(BOT_TOKEN).then(() => {
  console.clear();
  console.info("|> Starting...");

  // Run functions
  loadEvents(client);
  loadCommands(client);
});
