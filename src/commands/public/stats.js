const sql = require('../../database/mysql.js');
const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, Image } = require('canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

module.exports = {
     data: new SlashCommandBuilder()
          .setName('stats')
          .setDescription('See your stats or someone else\'s stats')
          .addStringOption(option =>
               option
                    .setName('player')
                    .setDescription('In game username (include "." for bedrock)')
                    .setRequired(true)
          ),

     async execute(interaction, client) {
          const player = interaction.options.getString('player');
          if (player.includes("*")) { var skin = "Zenoffire" } else { var skin = player }
          await interaction.reply({ content: '<a:loading:1069476742571511860> Fetching...', fetchReply: true });

          let result = await sql.Execute(`SELECT * FROM Player_Stats WHERE username = '${player}'`);
          let playerNotFoundEmbed = {
               description: `\`${player}\` was not found in the database.`,
               color: client.color.red
          }
          if (result.length == 0) return interaction.editReply({ content: '', embeds: [playerNotFoundEmbed] });

          // Register a custom font from dir './assets/font/minecraftBold.ttf'
          // registerFont('./assets/font/minecraftBold.ttf', { family: 'Minecraft' });
          // Not working for some reason

          // Generate the image
          const canvas = createCanvas(630, 630);
          const ctx = canvas.getContext('2d');

          const background = await readFile('./src/assets/img/background.png');
          const backgroundImage = new Image();
          backgroundImage.src = background;
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

          // Username background
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
          ctx.fillRect(0, 0, 630, 70)

          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          // Username border bottom
          const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
          grad.addColorStop(0, '#2953f3');
          grad.addColorStop(0.5, '#7c97fd');
          grad.addColorStop(1, '#2953f3');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 69, 630, 2)

          // Border
          ctx.strokeStyle = '#2953f3';
          ctx.strokeRect(0, 0, canvas.width, canvas.height);

          // Stats
          ctx.font = '20px Sans, Bold';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = "center";
          ctx.fillText(`${result[0].username}`, canvas.width * 0.5, 45);

          ctx.font = '20px Sans';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`Level: ${result[0].level}!`, canvas.width / 2.5, canvas.height / 1.8);

          // Player skin
          // ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          // ctx.fillRect(20, 528, 80, 80)
          const { body } = await request(`https://minotar.net/bust/${skin}/50.png`);
          const avatar = new Image();
          avatar.src = Buffer.from(await body.arrayBuffer());
          ctx.drawImage(avatar, 23, 10, 50, 50);

          // Send the image
          const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: `${result[0].username.toLowerCase()}'s stats.png` });
          await interaction.editReply({ content: '', files: [attachment] });
     },
};
