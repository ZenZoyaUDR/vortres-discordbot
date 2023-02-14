const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('progress')
        .setDescription('See the music timestamp'),

    async execute(interaction, client) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            return interaction.reply({ content: `There is no music currently playing!`, allowedMentions: { repliedUser: false } });
        }
        const progress = queue.createProgressBar();
        const timestamp = queue.getPlayerTimestamp();
        if (timestamp.progress == 'Infinity') {
            return interaction.reply({ content: `Cant not display duration`, allowedMentions: { repliedUser: false } });
        }

        let TsEmbed = {
            description: `**Timestamp**:\n${progress}`,
            color: client.color.yellow
        }
        interaction.reply({ embeds: [TsEmbed] });
    },
};
