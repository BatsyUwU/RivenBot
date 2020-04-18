const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");

module.exports.ownerAccess = (message) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("You're not my master")
        .setDescription(`💢 **${message.author.tag}**, Only my master can use this **Command**.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};