const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");

module.exports.modAction = (target, message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.GREEN)
        .setTitle("Successful")
        .setDescription(`✅ **${target}**, has been ${text}.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 10000 }));
};

module.exports.purgeAction = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.GREEN)
        .setTitle("Successful")
        .setDescription(`✅ **${message.author.tag}**, \`${text}\` messages were purged.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 10000 }));
};

module.exports.createRole = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.GREEN)
        .setTitle("Successful")
        .setDescription(`✅ **${message.author.tag}**, has succeeded in creating the \`${text}\` role.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 10000 }));
};