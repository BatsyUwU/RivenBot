const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const math = require("mathjs");

module.exports = {
    config: {
        name: "calculator",
        aliases: ["calc", "math", "solve"],
        category: "utilities",
        description: "Calculates for you an calculation",
        usage: "<equation>",
        example: "10+7",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("You have to specify what you would like to count on!");
        }
        
        const mathEquation = args.join(" ");

        let answer;
        try {
            answer = math.evaluate(mathEquation);
        } catch (e) {
            return message.channel.send("Invalid mathematical calculation!");
        }

        const roleColor = message.guild.me.roles.highest.hexColor;
        
        const calcEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("Math Calculation")
            .setDescription(`**Calculation:**\n\`\`\`\n${mathEquation}\n\`\`\`**Result:**\n\`\`\`\n${answer}\n\`\`\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
        
        message.channel.send(calcEmbed);
    }
};