const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "hug",
        aliases: [""],
        category: "sfw",
        description: "Gives you a hug!",
        usage: "[mention]",
        example: "@hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let mention = message.mentions.users.first();

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (mention && mention !== message.author) {
            neko.sfw.hug().then(hug => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`${message.author} likes ${mention} a lot and gives him a hug.`)
                    .setImage(hug.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        } else {
            neko.sfw.hug().then(hug => {
                const embed = new MessageEmbed()
                    .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                    .setDescription(`I will hug you ${message.author}, don't worry.`)
                    .setImage(hug.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
    
                message.channel.send(embed);
            });
        }
    }
};