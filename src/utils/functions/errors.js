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

module.exports.userPerms = (message, perm) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Insufficient Permission.")
        .setDescription(`💢 **${message.author.tag}**, You don't have \`${perm}\` permission.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};

module.exports.botPerms = (message, perm) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Insufficient Permission.")
        .setDescription(`💢 **${message.author.tag}**, I don't have \`${perm}\` permission.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};

module.exports.wrongText = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Error!")
        .setDescription(`💢 **${message.author.tag}**, ${text}`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};

module.exports.noMention = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Couldn't find a user.")
        .setDescription(`💢 **${message.author.tag}**, Please mention a user to ${text}.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};