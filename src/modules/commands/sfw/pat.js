const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "pat",
        aliases: [""],
        category: "sfw",
        description: "Gives you a pat!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (bot, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.pat().then(pat => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} is patting ${mention}.`)
                    .setImage(pat.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.pat().then(pat => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`There, I will pat you ${message.author}.`)
                    .setImage(pat.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};