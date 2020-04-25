const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "avatar",
        aliases: ["av", "ava", "avy"],
        category: "information",
        description: "Sends the mentioned user's avatar.",
        usage: "[mention]",
        example: "@Rygent",
        accessableby: "Members"
    },
    run: async (bot, message) => {
        let msg = await message.channel.send("Generating...");
        let target = message.mentions.users.first() || message.author;
        msg.delete();

        const roleColor = message.guild.me.roles.highest.hexColor;
        
        let avatarEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle(`🖼️ ${target.tag}'s avatar`)
            .setDescription(`🔗 **[HD Resolution](${target.displayAvatarURL({ format: "png", dynamic: true, size: 4096 })})**`)
            .setImage(target.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(avatarEmbed);
    }
};