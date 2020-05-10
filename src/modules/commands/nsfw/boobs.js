const { MessageEmbed } = require("discord.js");
const Errors = require("../../../utils/functions/errors");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "boobs",
        aliases: [""],
        category: "nsfw",
        description: "Posts a random boobs picture. Warning this commands for 18+",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (!message.channel.nsfw) return Errors.nsfwAccess(message);

        const roleColor = message.guild.me.roles.highest.hexColor;
        
        neko.nsfw.boobs().then(boobs => {
            const embed = new MessageEmbed()
                .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                .setImage(boobs.url)
                .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send(embed);
        });
    }
};