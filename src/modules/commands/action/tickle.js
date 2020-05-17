const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "tickle",
        aliases: [""],
        category: "action",
        description: "Gives you a tickle!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.tickle().then(tickle => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} just tickled ${mention}.`)
                    .setImage(tickle.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.tickle().then(tickle => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} has been tickled by me.`)
                    .setImage(tickle.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};