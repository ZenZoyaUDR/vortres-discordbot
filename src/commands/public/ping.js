const { SlashCommandBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "ping",
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the bot system statistics"),

  async execute(interaction, client) {
    const sent = await interaction.reply({
      content: "<a:loading:1069476742571511860> Pinging...",
      fetchReply: true,
    });

    const ping = Math.floor(
      sent.createdTimestamp - interaction.createdTimestamp
    );
    var duration = moment
      .duration(client.uptime)
      .format("`D` [days], `H` [hrs], `m` [mins], `s` [secs]");
    var pingSeconds = (ping % 60000) / 1000;
    var apiSeconds = (client.ws.ping % 60000) / 1000;

    let pingEmbed = {
      description: `Connection data and more!`,
      fields: [
        {
          name: `Bot Latency`,
          value: `\`${ping}ms\` **|** \`${pingSeconds}s\``,
          inline: true,
        },
        {
          name: `API Latency`,
          value: `\`${Math.round(client.ws.ping)}ms\` **|** \`${apiSeconds}s\``,
          inline: true,
        },
        {
          name: `\u200B`,
          value: `System`,
          inline: false,
        },
        {
          name: `CPU Usage`,
          value: `\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\``,
          inline: true,
        },
        {
          name: `RAM Usage`,
          value: `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(
            2
          )}MB\``,
          inline: true,
        },
        {
          name: `Uptime`,
          value: `${duration}`,
          inline: false,
        },
      ],
      color: client.color.blue,
    };
    interaction.editReply({ content: "", embeds: [pingEmbed] });
  },
};
