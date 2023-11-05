const { ShardingManager } = require("discord.js");
const { log } = require("./lib/logger");
const env = require("dotenv");
env.config();

console.clear();
const manager = new ShardingManager("./src/bot.js", {
  token: process.env.BOT_TOKEN,
  totalShards: 2, // Adjust the number of shards as needed.
});

manager.on("shardCreate", (shard) => {
  log.success(`Launched shard #${shard.id}`);
});

manager.spawn();
