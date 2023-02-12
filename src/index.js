// Import
require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection, Events, REST, Routes } = require('discord.js');
const { Player } = require("discord-player");

// Env
const { BOT_TOKEN, BOT_ID } = process.env;

// Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Helpers
client.color = require('./helpers/colorHelper');

// Music Player
global.player = new Player(
  client,
  {
    ytdlOptions: {
      quality: "highestaudio",
      highWaterMark: 1 << 25
    }
  });

(async () => {
  console.clear();
  console.info("|> Starting bot...");

  // Registering Slash commands
  const commands = [];
  const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`../src/commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

  try {
    console.info(`|> Started refreshing ${commands.length} application (/) commands`);

    const data = await rest.put(
      Routes.applicationCommands(BOT_ID),
      { body: commands },
    );

    console.info(`|> Successfully reloaded ${data.length} application (/) commands`);
  } catch (err) {
    console.info('\n\nAn error has occured:\n', err);
  }

  // Commands Handler
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles2 = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles2) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
  }

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    try {
      await command.execute(interaction, client);
    } catch (err) {
      let slashError = {
        description: `There was an error while executing this command!\n\n**Error:**\n\`\`\`${err}\`\`\``,
        color: client.color.red,
      }
      await interaction.reply({ embeds: [slashError], ephemeral: true });
      console.info('\n\nAn error has occured:\n', err);
    }
  });

  // Logging-in bot
  console.info('|> Authenticating with Discord');
  await client.login(BOT_TOKEN);
  console.info(`|> Logged-in as ${client.user.tag}`);
  console.info('|> Completed Discord authentication');
})();
