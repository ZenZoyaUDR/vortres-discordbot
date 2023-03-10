const sql = require('../../database/mysql.js');
const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, Image } = require('canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

const applyText = (canvas, text) => {
     const ctx = canvas.getContext('2d');
     let fontSize = 70;
     do {
          ctx.font = `${fontSize -= 10}px sans-serif`;
     } while (ctx.measureText(text).width > canvas.width - 300);
     return ctx.font;
};

module.exports = {
     data: new SlashCommandBuilder()
          .setName('stats')
          .setDescription('See your stats or someone else\'s stats')
          .addStringOption(option => option.setName('player').setDescription('In game username (include "." for bedrock)').setRequired(true)),

     async execute(interaction, client) {
          await interaction.reply({ content: '<a:loading:1069476742571511860> Fetching...', fetchReply: true });
          const player = interaction.options.getString('player');
          let result = await sql.Execute(`SELECT * FROM Player_Stats WHERE username = '${player}'`);
          if (result.length == 0) return interaction.editReply({ content: `${player} doesn\'t exist in the database.` })

          // Generate the image
          const canvas = createCanvas(630, 630);
          const ctx = canvas.getContext('2d');

          const background = await readFile('./img/background.png');
          const backgroundImage = new Image();
          backgroundImage.src = background;
          ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.strokeStyle = '#385ef1';
          ctx.strokeRect(0, 0, canvas.width, canvas.height);

          ctx.font = '50px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = "center";
          ctx.fillText(`${result[0].username}`, canvas.width * 0.5, 50);

          ctx.font = applyText(canvas, `${result[0].level}!`);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${result[0].level}!`, canvas.width / 2.5, canvas.height / 1.8);

          // Player bust
          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.fillRect(20, 528, 80, 80)
          const { body } = await request(`https://minotar.net/bust/Zenoffire/70.png`);
          const avatar = new Image();
          avatar.src = Buffer.from(await body.arrayBuffer());
          ctx.drawImage(avatar, 25, 533, 70, 70);

          // Send the image
          const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'stats-image.png' });
          await interaction.editReply({ content: '', files: [attachment] });
     },
};
