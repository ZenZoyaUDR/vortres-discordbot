module.exports = {
     name: "interactionCreate",

     async execute(interaction, client) {
          if (!interaction.isChatInputCommand()) return;
          const command = client.commands.get(interaction.commandName);
          if (!command) return;

          try {
               await command.execute(interaction, client);
          } catch (err) {
               console.info(`\n\nAn error has occurred:\n ${err}\n\n`);
          }
     }
}
