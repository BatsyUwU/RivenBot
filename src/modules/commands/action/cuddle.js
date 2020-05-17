const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "cuddle",
        aliases: [""],
        category: "action",
        description: "Cuddles you!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.cuddle().then(cuddle => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} cuddles ${mention}.`)
                    .setImage(cuddle.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.cuddle().then(cuddle => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} is getting cuddled by me.`)
                    .setImage(cuddle.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};