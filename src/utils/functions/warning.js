const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");

module.exports.reason = (message, cmd) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.ORANGE)
        .setTitle("Provide a reason")
        .setDescription(`⚠️ **${message.author.tag}**, Please enter a reason for the ${cmd}...\nThis text-entry period will time-out in 60 seconds. Reply with \`cancel\` to exit.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 61000 }));
};

module.exports.cancel = (title, message, cmd) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.ORANGE)
        .setTitle(title)
        .setDescription(`⚠️ **${message.author.tag}**, The user has not been ${cmd}.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 10000 }));
};

module.exports.muteRoles = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.ORANGE)
        .setTitle("Roles not found")
        .setDescription(`⚠️ **${message.author.tag}**, ${text}`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 30000 }));
};

module.exports.customWarn = (title, message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.ORANGE)
        .setTitle(title)
        .setDescription(`⚠️ **${message.author.tag}**, ${text}`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 30000 }));
};