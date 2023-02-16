const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Disconnect from VC and stop the music'),

    async execute(interaction, client) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) {
            let NoMusic = {
                description: `There is no music currently playing`,
                color: client.color.yellow
            }
            return interaction.reply({ embeds: [NoMusic] });
        }

        queue.destroy();
        let LeaveEmbed = {
            description: `Disconnected from VC`,
            color: client.color.yellow
        }
        interaction.reply({ embeds: [LeaveEmbed] });
    },
};
