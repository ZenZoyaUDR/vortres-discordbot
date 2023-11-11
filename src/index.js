const { ShardingManager } = require("discord.js");
const colors = require("console-log-colors");
const { log } = require("./lib/logger");
const env = require("dotenv");
env.config();

console.clear();
const manager = new ShardingManager("./src/bot.js", {
  token: process.env.BOT_TOKEN,
  totalShards: 1, // Adjust the number of shards as needed.
  respawn: true,
  mode: "process",
});

manager.on("shardCreate", (shard) => {
  log.info(
    `${colors.magenta(
      `Launch shard ${colors.green(
        `#${shard.id + 1} ${colors.gray(`(#${shard.id})`)}`
      )}`
    )}`
  );
});

manager.spawn().then(() => {
  log.success(
    `${colors.green(
      `Bot is online! ${colors.grey(`(${manager.totalShards} total shards)`)}`
    )}`
  );
});
