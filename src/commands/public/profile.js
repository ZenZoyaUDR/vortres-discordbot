const { AttachmentBuilder, SlashCommandBuilder } = require('discord.js');
const { createCanvas, Image } = require('canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

const applyText = (canvas, text) => {
  const context = canvas.getContext('2d');
  let fontSize = 70;
  do {
    context.font = `${fontSize -= 10}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);
  return context.font;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('profile')
    .setDescription('See your profile'),
  async execute(interaction, client) {
    await interaction.reply({ content: '<a:loading:1069476742571511860> Generating...', fetchReply: true });
    const canvas = createCanvas(700, 250);
    const context = canvas.getContext('2d');

    const background = await readFile('./img/wallpaper.jpg');
    const backgroundImage = new Image();
    backgroundImage.src = background;
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#0099ff';
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = '28px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText('Profile', canvas.width / 2.5, canvas.height / 3.5);

    context.font = applyText(canvas, `${interaction.member.displayName}!`);
    context.fillStyle = '#ffffff';
    context.fillText(`${interaction.member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const { body } = await request(interaction.user.displayAvatarURL({ format: 'jpg' }));
    const avatar = new Image();
    avatar.src = Buffer.from(await body.arrayBuffer());
    context.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

    interaction.editReply({ content: '', files: [attachment] });
  },
};