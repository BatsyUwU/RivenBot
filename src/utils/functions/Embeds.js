const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");

module.exports = {
    errors: async function (type, message, args) {
        const embed = new MessageEmbed()
            .setColor(Colors.RED)
            .setFooter(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
        switch (type) {
            case "noQuery": {
                embed.setTitle("ERROR!")
                .setDescription(`💢 **${message.author.tag}**, You must provide a search query!`)
                break;
            }
            case "invalidQuery": {
                embed.setTitle("ERROR!")
                .setDescription(`💢 **${message.author.tag}**, No results were found!`)
                break;
            }
            default: {
                embed.setTitle("ERROR!")
                .setDescription(`💢 **${message.author.tag}**, Sorry, but an error has occured.`)
            }
        }
        message.channel.send(embed);
    }
};