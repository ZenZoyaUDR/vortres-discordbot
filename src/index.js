// Import
require('dotenv').config();
const { Player } = require('discord-player');
const { loadEvents } = require('./handler/eventHandler');
const { loadCommands } = require('./handler/commandHandler');
const { Client, GatewayIntentBits, Collection, Events, REST, Routes } = require('discord.js');

// Env
const { BOT_TOKEN } = process.env;

// Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});
client.commands = new Collection();

// Helpers
client.color = require('./helpers/colorHelper');

// Music Player
global.player = new Player(
  client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
});


client.login(BOT_TOKEN).then(() => {
  console.clear();
  console.info('|> Starting...');

  // Run functions
  loadEvents(client);
  loadCommands(client);
});