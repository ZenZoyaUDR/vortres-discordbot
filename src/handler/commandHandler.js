function loadCommands(client) {
     const fs = require('node:fs');

     let commandsArray = [];

     const commandsFolder = fs.readdirSync('./src/commands');
     for (const folder of commandsFolder) {
          const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));

          for (const file of commandFiles) {
               const commandFile = require(`../../src/commands/${folder}/${file}`);

               client.commands.set(commandFile.data.name, commandFile);
               commandsArray.push(commandFile.data.toJSON());
          }
     }
     client.application.commands.set(commandsArray);
     return console.info('|> Commands loaded');
}

module.exports = { loadCommands };