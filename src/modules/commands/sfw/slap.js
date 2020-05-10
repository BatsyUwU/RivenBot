const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "slap",
        aliases: [""],
        category: "sfw",
        description: "Gives you a slap!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.slap().then(slap => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} just slapped ${mention}.`)
                    .setImage(slap.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.slap().then(slap => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} just slapped himself.`)
                    .setImage(slap.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};