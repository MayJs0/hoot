const Canvas = require('canvas')
const Discord = require('discord.js')
const { fillTextWithTwemoji } = require("node-canvas-with-twemoji-and-discord-emoji");
const background = 'assets/images/welcome.png'
Canvas.registerFont('assets/fonts/Monocraft.ttf' , {
    family: 'Monocraft'
})

const welcome = async(client, message) => {
    const user = message.user
    const canvas = Canvas.createCanvas(1640,664)
    const ctx = canvas.getContext('2d')
    const backimg = await Canvas.loadImage(background, {format: "png"})
    ctx.drawImage(backimg, 0 , 0)
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    // textos
    ctx.font = '55px Monocraft';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`${user.username.toUpperCase()}`, 349, 347)

    ctx.font = '35px Monocraft';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`You are our ${message.guild.members.cache.size}° member!`, 650, canvas.height / 1.02)

    ctx.font = '45px Monocraft';
    ctx.fillStyle = "#ffffff";
    await fillTextWithTwemoji(ctx, `${user.id}`, 349, 395)

    ctx.font = '50px Monocraft';
    ctx.fillStyle = "#ffffff";
    const width = ctx.measureText(message.guild.name).width;
    const distance = 1640/2 - width;
    const x = (distance + width / 2) - 15;
    await fillTextWithTwemoji(ctx, `${message.guild.name}`, x, 260)

    // ------------------------- // 
    const avatar = await Canvas.loadImage(user.displayAvatarURL({extension: 'jpg', size: 1024 }))
    // ctx.drawImage(avatar, 20, 90, 195, 180);
    ctx.beginPath();
    ctx.arc(183, 386, 145, 0, Math.PI * 2, true); 
    ctx.stroke(); 
    ctx.closePath(); 
    ctx.clip(); 
    ctx.drawImage(avatar, 35, 240, 295, 295); // 10, 12, 295, 295
    const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), "welcome.png")
    return attachment

}
module.exports = welcome