const { SlashCommandBuilder } = require('discord.js');
const { loadEvents } = require('../../handler/eventHandler');
const { loadCommands } = require('../../handler/commandHandler');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('reload')
          .setDescription('Reload the bot (developers only)')
          .addStringOption((option) =>
               option
                    .setName('type')
                    .setDescription('What type of reload you want?')
                    .addChoices(
                         { name: 'All', value: 'reload_all' },
                         { name: 'Commands', value: 'reload_commands' },
                         { name: 'Events', value: 'reload_events' },
                    )
                    .setRequired(true)
          ),
     async execute(interaction, client) {
          const { user } = interaction;

          if (user.id !== "915228509440454707") return interaction.reply({ content: 'You are not authorized to run this command.' });
          switch (interaction.options._hoistedOptions.map(x => x.value).toString()) {
               case 'reload_all': {
                    loadEvents(client);
                    loadCommands(client);

                    return interaction.reply({ content: 'Commands & Events reloaded.' });
                    break
               }
               case 'reload_commands': {
                    loadCommands(client);

                    return intersction.reply({ content: 'Commands reloaded.' });
                    break
               }
               case 'reload_events': {
                    loadEvents(client);

                    return interaction.reply({ content: 'Events reloaded.' });
                    break
               }
          }
     },
};
