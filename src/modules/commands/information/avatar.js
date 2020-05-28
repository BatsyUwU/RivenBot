const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { resolveUser } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "avatar",
        aliases: ["av", "ava", "avy"],
        category: "information",
        description: "Sends the mentioned user's avatar.",
        usage: "[mention | ID]",
        example: "@Rygent",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Generating...");
		let user = await resolveUser(message, args[0]);
		if (!user) user = message.author;
		msg.delete();

		const roleColor = message.guild.me.roles.highest.hexColor;

		const avatarEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("🖼️ Avatar")
			.setImage(user.displayAvatarURL({ format: "png", dynamic: true, size: 512 }))
			.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
			.setTimestamp();

		if (message.content.includes("-hd")) {
			avatarEmbed.addField(`${user.tag}`, stripIndents`
            \`ID: ${user.id}\`
            **[HD Resolution](${user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 })})**`);
		} else {
			avatarEmbed.addField(`${user.tag}`, stripIndents`
            \`ID: ${user.id}\``);
		}

		message.channel.send(avatarEmbed);
    }
};