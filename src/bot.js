// Import
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { invis, blue, red, yellow } = require("./helpers/colorHelper");
const { loadCommands } = require("./handler/commandHandler");
const { loadEvents } = require("./handler/eventHandler");
const { log } = require("./lib/logger");
const env = require("dotenv");
env.config();

// Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.color = { invis, blue, red, yellow };
client.commands = new Collection();

// Event listener for any unhandled errors
client.on("error", (error) => {
  log.error("Unhandled error:", error);
});
process.on("unhandledRejection", (reason, promise) => {
  log.error("Unhandled promise rejection:", reason);
});
process.on("uncaughtException", (error) => {
  log.error("Uncaught exception:", error);
});
client.on("disconnect", () => {
  log.warn("Disconnected from Discord");
});
client.on("reconnecting", () => {
  log.warn("Attempting to reconnect to Discord...");
});
client.on("resume", (replayed) => {
  log.info(`Reconnected to Discord (replayed ${replayed} events)`);
});
// End of event listeners

// Login
client.login(process.env.BOT_TOKEN).then(() => {
  // Run functions
  loadEvents(client);
  loadCommands(client);
});
