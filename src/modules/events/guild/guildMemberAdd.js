const { MessageEmbed } = require("discord.js");
const { Actions, Colors } = require("../../../utils/configs/settings");

module.exports = async (client, member) => {
    const sendChannel = member.guild.channels.cache.find((channel) => channel.name === Actions.GREETING);

    const embed = new MessageEmbed()
        .setAuthor("Member Joined", member.user.avatarURL())
        .setDescription(`${member} ${member.user.tag}`)
        .setThumbnail(member.user.avatarURL({ format: "png", dynamic: true, size: 4096 }))
        .setColor(Colors.GREEN)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp();

    sendChannel.send(embed);
};