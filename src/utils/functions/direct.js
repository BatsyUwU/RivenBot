const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");
const { stripIndents } = require("common-tags");

module.exports.banDM = (target, message, reason) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle(`🚫 Banned from ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(stripIndents`
            Hello, you have been banned.
            Reason: ${reason}\n
            __*Please make sure you always follow the rules, because not doing so can result in punishment.*__`)
        .setTimestamp();

    target.send(replyEmbed);
};

module.exports.kickDM = (target, message, reason) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.ORANGE)
        .setTitle(`👢 Kicked from ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(stripIndents`
            Hello, you have been kicked.
            Reason: ${reason}\n
            __*Please make sure you always follow the rules, because not doing so can result in punishment.*__`)
        .setTimestamp();

    target.send(replyEmbed);
};