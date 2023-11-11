const Redis = require("ioredis");
const env = require("dotenv");
env.config();

const redis = new Redis({
  port: process.env.REDIS_PORT, // Redis port
  host: process.env.REDIS_HOST, // Redis host
  username: "default", // needs Redis >= 6
  password: process.env.REDIS_PASSWORD,
  db: 0, // Defaults to 0
});

module.exports = redis;
