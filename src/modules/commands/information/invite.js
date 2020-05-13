const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "invite",
        aliases: ["join"],
        category: "information",
        description: "Gives you the invite link!",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (client, message) => {
        const roleColor = message.guild.me.roles.highest.hexColor;

        const inviteEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("__**Invitation Link**__")
            .setDescription(`[Invite ${client.user.username}](https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot&permissions=1043721303)\n[Support Server](https://discord.gg/GG69j8w)`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(inviteEmbed);
    }
}