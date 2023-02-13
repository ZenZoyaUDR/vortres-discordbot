const { SlashCommandBuilder } = require('discord.js');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('progress')
          .setDescription('See the music progress')

     async execute(interaction, client) {
        const queue = client.player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing)
            return interaction.reply({ content: `There is no music currently playing!.`, allowedMentions: { repliedUser: false } });

        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();

        if (timestamp.progress == 'Infinity')
            return interaction.reply({ content: `This song is live streaming, no duration data to display.`, allowedMentions: { repliedUser: false } });

        interaction.reply(`${progress} (**${timestamp.progress}**%)`);
     },
}
