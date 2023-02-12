const { SlashCommandBuilder } = require('discord.js');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('loop')
          .setDescription("loads songs from youtube")
          .addStringOption((option) =>
               option
                    .setName('action')
                    .setDescription('What action should be taken with the users points?')
                    .addChoices(
                         { name: 'Queue', value: 'enable_loop_queue' },
                         { name: 'Disable', value: 'disable_loop' },
                         { name: 'Song', value: 'enable_loop_song' },
                    )
                    .setRequired(true)
          ),
     async execute(interaction, client) {
          const queue = player.getQueue(interaction.guildId);

          if (!queue || !queue.playing) return interaction.reply({ content: `No music currently playing ${interaction.member}... try again ? ❌`, ephemeral: true });
          switch (interaction.options._hoistedOptions.map(x => x.value).toString()) {
               case 'enable_loop_queue': {
                    if (queue.repeatMode === 1) return interaction.reply({ content: `You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                    const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);

                    return interaction.reply({ content: success ? `Repeat mode **enabled** the whole queue will be repeated endlessly 🔁` : `Something went wrong ${inter.member}... try again ? ❌` });
                    break
               }
               case 'disable_loop': {
                    const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                    return intersction.reply({ content: success ? `Repeat mode **disabled**` : `Something went wrong ${inter.member}... try again ? ❌` });
                    break
               }
               case 'enable_loop_song': {
                    if (queue.repeatMode === 2) return intersction.reply({ content: `You must first disable the current music in the loop mode (/loop Disable) ${inter.member}... try again ? ❌`, ephemeral: true });

                    const success = queue.setRepeatMode(QueueRepeatMode.TRACK);

                    return interaction.reply({ content: success ? `Repeat mode **enabled** the current song will be repeated endlessly (you can end the loop with /loop disable)` : `Something went wrong ${inter.member}... try again ? ❌` });
                    break
               }
          }
     },
}