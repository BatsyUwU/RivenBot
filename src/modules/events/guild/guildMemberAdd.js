const { MessageEmbed } = require("discord.js");
const { Action, Colors } = require("../../../utils/configs/settings");

module.exports = async (bot, member) => {
    let sendChannel = member.guild.channels.cache.find(x => x.name === `${Action.JOIN}`);

    let embed = new MessageEmbed()
        .setAuthor("Member Joined", member.user.avatarURL())
        .setDescription(`${member} ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setColor(Colors.GREEN)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp();

    sendChannel.send(embed);
};