const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const eightBall = require("../../../assets/json/8ball");

module.exports = {
    config: {
        name: "8ball",
        aliases: ["8-ball", "eightball", "fortune"],
        category: "fun",
        description: "Returns an answer to any question!",
        usage: "<question>",
        example: "Do you love me?",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (!args[1]) {
            return Errors.wrongText(message, "Please provide a question for me to answer.")
        };

        const roleColor = message.guild.me.roles.highest.hexColor;
        
        let ballEmbed = new MessageEmbed()
            .setColor(roleColor === '#000000' ? Colors.CUSTOM : roleColor)
            .setTitle(`🎱 ${args.slice(0).join(" ")}`)
            .setDescription(`❯  ${eightBall[Math.floor(Math.random() * eightBall.length).toString(10)]}`)
            .setFooter(`Requested by ${message.member.user.tag}`, message.member.user.avatarURL({ dynamic: true }))
            .setTimestamp();
        
        message.channel.send(ballEmbed);
    }
};