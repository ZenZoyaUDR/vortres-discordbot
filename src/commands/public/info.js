const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require("discord.js");
const redis = require("../../lib/redis");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "info",
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Get the information about the bot"),

  async execute(interaction, client) {
    const sent = await interaction.reply({
      content: "<a:loading:1069476742571511860> Lodading...",
      fetchReply: true,
    });
    const promises = [
      client.shard.fetchClientValues("guilds.cache.size"),
      client.shard.broadcastEval((c) =>
        c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
      ),
    ];

    return Promise.all(promises).then((results) => {
      const totalGuilds = results[0].reduce(
        (acc, guildCount) => acc + guildCount,
        0
      );
      const totalMembers = results[1].reduce(
        (acc, memberCount) => acc + memberCount,
        0
      );

      // Create buttons
      const next1 = new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Next page")
        .setStyle(ButtonStyle.Secondary);
      const prev1 = new ButtonBuilder()
        .setCustomId("prev")
        .setLabel("Previous page")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);
      const page1 = new ActionRowBuilder().addComponents([prev1, next1]);
      const next2 = new ButtonBuilder()
        .setCustomId("next")
        .setLabel("Next page")
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);
      const prev2 = new ButtonBuilder()
        .setCustomId("prev")
        .setLabel("Previous page")
        .setStyle(ButtonStyle.Secondary);
      const page2 = new ActionRowBuilder().addComponents([prev2, next2]);

      // Default embed
      const page1Embed = {
        description: `Here is the general information`,
        fields: [
          {
            name: `Library Used`,
            value: `Discord.js`,
            inline: true,
          },
          {
            name: `Bot Creator`,
            value: `@zenzoya`,
            inline: true,
          },
          {
            name: `\u200B`,
            value: `Guilds & others\n\`${totalGuilds}\` Guilds\n\`${totalMembers}\` Members`,
            inline: false,
          },
          {
            name: `Total Shards`,
            value: `\`${client.shard.count}\` Shards`,
            inline: true,
          },
          {
            name: `Guild Shard ID`,
            value: `\`#${client.shard.ids.join(", ")}\``,
            inline: true,
          },
        ],
        color: client.color.blue,
      };
      interaction.editReply({
        content: "",
        embeds: [page1Embed],
        components: [page1],
      });

      // Handle the buttons
      const filter = (i) => i.user.id === interaction.user.id && i.isButton();
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 60000 * 2,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "next") {
          const ping = Math.floor(
            sent.createdTimestamp - interaction.createdTimestamp
          );
          var duration = moment
            .duration(client.uptime)
            .format("`D` [days], `H` [hrs], `m` [mins], `s` [secs]");
          const page2Embed = {
            description: `Here is the connection information`,
            fields: [
              {
                name: `PING`,
                value: `API: \`${Math.round(
                  client.ws.ping
                )}ms\`\nBot: \`${ping}ms\``,
                inline: true,
              },
              {
                name: `Memory`,
                value: `\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(
                  2
                )} MB\``,
                inline: true,
              },
              {
                name: `CPU`,
                value: `\`${(process.cpuUsage().system / 1024 / 1024).toFixed(
                  2
                )}%\``,
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
          i.update({ content: "", embeds: [page2Embed], components: [page2] });
        } else if (i.customId === "prev") {
          i.update({
            content: "",
            embeds: [page1Embed],
            components: [page1],
          });
        }
      });
    });
  },
};
