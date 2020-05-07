const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");
const { stripIndents } = require("common-tags");

module.exports.banDM = (target, message, reason) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle(`🚫 Banned from ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(stripIndents`
            Hello, you were banned by moderator.
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
            Hello, you were kicked by moderator.
            Reason: ${reason}\n
            __*Please make sure you always follow the rules, because not doing so can result in punishment.*__`)
        .setTimestamp();

    target.send(replyEmbed);
};

module.exports.muteDM = (target, message, reason) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.GREY)
        .setTitle(`🔇 Muted from ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(stripIndents`
            Hello, you were muted by moderator.
            Reason: ${reason}\n
            __*Please ensure you follow all the rules of the server in the future to avoid this occurring again.*__`)
        .setTimestamp();

    target.send(replyEmbed);
};

module.exports.unmuteDM = (target, message, reason) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.GREY)
        .setTitle(`🔊 Unmuted from ${message.guild.name}`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(stripIndents`
            Hello, you were unmuted by moderator.
            Reason: ${reason}\n
            __*Please ensure you always follow the rules to prevent being muted again!*__`)
        .setTimestamp();

    target.send(replyEmbed);
};