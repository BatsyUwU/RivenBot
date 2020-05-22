const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { getMember } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "love",
        aliases: ["affinity"],
        category: "fun",
        description: "Shows how in love you are with a user.",
        usage: "[mention | id]",
        example: "@Ryevi",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        let person = getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members.cache.filter(m => m.id !== message.author.id).random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const roleColor = message.guild.me.roles.highest.hexColor;

        const embed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setDescription(stripIndents`
            **${message.member.displayName}** is ${Math.floor(love)}% in love with **${person.displayName}**
            ${loveLevel}`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(embed);
    }
};