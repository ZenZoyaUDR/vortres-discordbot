const { SlashCommandBuilder } = require("discord.js");

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
      let infoEmbed = {
        description: `Here is the information`,
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
            value: `Guilds & others`,
            inline: false,
          },
          {
            name: `Total Guilds`,
            value: `\`${totalGuilds}\` Guilds`,
            inline: true,
          },
          {
            name: `Total Members`,
            value: `\`${totalMembers}\` Members`,
            inline: false,
          },
          {
            name: `Total Shards`,
            value: `\`${client.shard.count}\` Shards`,
            inline: true,
          },
          {
            name: `Shard ID`,
            value: `\`#${client.shard.ids.join(", ")}\``,
            inline: true,
          },
        ],
        color: client.color.blue,
      };
      interaction.editReply({ content: "", embeds: [infoEmbed] });
    });
  },
};
