module.exports = {
     name: "interactionCreate",

     async execute(interaction, client) {
          if (!interaction.isChatInputCommand()) return;
          const command = client.commands.get(interaction.commandName);
          if (!command) return;

          try {
               await command.execute(interaction, client);
          } catch (err) {
               let slashError = {
                    description: `There was an error while executing this command!\n\n**Error:**\n\`\`\`${err}\`\`\``,
                    color: client.color.red,
               };
               await interaction.reply({ embeds: [slashError], ephemeral: true });
               console.info(`\n\nAn error has occurred:\n ${err}\n\n`);
          }
     }
}