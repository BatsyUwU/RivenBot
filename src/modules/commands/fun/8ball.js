const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const eightBall = require("../../../assets/json/8ball");

module.exports = {
    config: {
        name: "8ball",
        aliases: ["8-ball", "eightball", "fortune"],
        category: "fun",
        description: "Returns an answer to any question!",
        usage: "<question>",
        example: "What do you want?",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!args[1]) {
            return message.client.embed.errors("commonError", message, "Please provide a question for me to answer.");
        }

        const roleColor = message.guild.me.roles.highest.hexColor;
        
        let ballEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle(`🎱 ${args.slice(0).join(" ")}`)
            .setDescription(`❯  ${eightBall[Math.floor(Math.random() * eightBall.length).toString(10)]}`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
        
        message.channel.send(ballEmbed);
    }
};