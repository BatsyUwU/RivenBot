const { MessageEmbed } = require("discord.js");
const { Client, Colors } = require("../configs/settings");

module.exports.ownerAccess = (message) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("You're not my master")
        .setDescription(`💢 **${message.author.tag}**, Only my master can use this **Command**.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.userPerms = (message, perm) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Insufficient Permission.")
        .setDescription(`💢 **${message.author.tag}**, You don't have \`${perm}\` permission.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.botPerms = (message, perm) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Insufficient Permission.")
        .setDescription(`💢 **${message.author.tag}**, I don't have \`${perm}\` permission.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.wrongText = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Error!")
        .setDescription(`💢 **${message.author.tag}**, ${text}`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.noMention = (message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Couldn't find a user.")
        .setDescription(`💢 **${message.author.tag}**, Please mention a user to ${text}.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.noYourself = (message, cmd) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle(`Can't ${cmd}`)
        .setDescription(`💢 **${message.author.tag}**, You can't ${cmd} yourself.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};

module.exports.resStatus = (code, message, text) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle(`Error code ${code}`)
        .setDescription(`💢 **${message.author.tag}**, ${text}`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.wrongCmd = (message, cmd) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle("Can't read that.")
        .setDescription(`💢 **${message.author.tag}**, Please enter something or read on \`${Client.PREFIX}help ${cmd}\``)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() !== null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    }

    message.channel.send(replyEmbed).then((m) => m.delete({ timeout: 20000 }));
};

module.exports.cmdOwner = (message, cmd) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle(`Can't ${cmd}`)
        .setDescription(`💢 **${message.author.tag}**, I can't ${cmd} my master.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};

module.exports.highRole = (message, cmd) => {
    let replyEmbed = new MessageEmbed()
        .setColor(Colors.RED)
        .setTitle(`Can't ${cmd}`)
        .setDescription(`💢 **${message.author.tag}**, You can't ${cmd} this user as they have a higher role than you.`)
        .setFooter(message.author.tag)
        .setTimestamp();

    if (message.author.avatarURL() != null) {
        replyEmbed.setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }));
    };

    message.channel.send(replyEmbed).then(m => m.delete({ timeout: 20000 }));
};