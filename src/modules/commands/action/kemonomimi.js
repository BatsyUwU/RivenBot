const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "kemonomimi",
        aliases: [""],
        category: "action",
        description: "Gives you a kemomomimi!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.kemonomimi().then(kemomomimi => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} gave some animal humans to ${mention}.`)
                    .setImage(kemomomimi.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.kemonomimi().then(kemomomimi => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`Have some animal humans ${message.author}.`)
                    .setImage(kemomomimi.url)
                    .setFooter("Powered by nekos.life")
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};