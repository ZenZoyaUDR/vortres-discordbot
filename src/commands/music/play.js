const { SlashCommandBuilder } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
     data: new SlashCommandBuilder()
          .setName('play')
          .setDescription('Play music from YouTube, and Spotify')
          .addStringOption(option =>
               option.setName('query')
                    .setDescription('The keywords or link of the song')
                    .setRequired(true)
          ),

     async execute(interaction, client) {
          const query = interaction.options.getString('query');
          await interaction.deferReply();
          const res = await player.search(query, {
               requestedBy: interaction.member,
               searchEngine: QueryType.AUTO
          });

          if (!res || !res.tracks.length) return interaction.editReply({ content: `No results found... Try again?`, ephemeral: true });

          const queue = await player.createQueue(interaction.guild, {
               metadata: interaction.channel,
               spotifyBridge: true,
               initialVolume: 50,
               leaveOnEnd: false
          });

          try {
               if (!queue.connection) await queue.connect(interaction.member.voice.channel);
          } catch {
               await player.deleteQueue(interaction.guildId);
               return interaction.editReply({ content: `I can't join the voice channel... Try again?`, ephemeral: true });
          }

          await interaction.editReply({ content: `🎧 Loading your ${res.playlist ? 'playlist' : 'track'}...` });

          res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

          if (!queue.playing) await queue.play();
     },
};