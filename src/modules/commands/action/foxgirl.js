const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "foxgirl",
        aliases: [""],
        category: "action",
        description: "Gives you a fox girl!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.foxGirl().then(foxGirl => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} thinks that ${mention} doesn't have enough fox girls.`)
                    .setImage(foxGirl.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.foxGirl().then(foxGirl => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`Have some cute fox girls ${message.author}.`)
                    .setImage(foxGirl.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};