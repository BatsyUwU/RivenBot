const { MessageEmbed } = require("discord.js");
const { Emotes } = require("../../../utils/configs/settings");
const { getMember } = require("../../../utils/functions/functions");
const { stripIndents } = require("common-tags");
const moment = require("moment");

module.exports = {
    config: {
        name: "user",
        aliases: ["uinfo", "userinfo", "whois"],
        category: "information",
        description: "Displays information about the mentioned user.",
        usage: "[mention | id]",
        example: "@Rygent",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const member = getMember(message, args.join(" "));

        let status = {
            "online": `${Emotes.ONLINE} Online`,
            "idle": `${Emotes.IDLE} Idle`,
            "dnd": `${Emotes.DND} Do Not Disturb`,
            "offline": `${Emotes.OFFLINE} Offline`
        };

        const roles = member.roles.cache.sort((a, b) => b.position - a.position).filter(r => r.id !== message.guild.id).map(r => r.name).join(", ") || "None";

        const userEmbed = new MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)
            .setAuthor(member.user.tag, member.user.avatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("❯ Details", stripIndents`
                • **Nickname:** ${member.nickname || "None"}
                • **ID:** ${member.user.id}
                • **Status:** ${status[member.user.presence.status]}
                • **Activity:** ${member.user.presence.activities}`)
            .addField("❯ Join Dates", stripIndents`
                • **Server:** ${moment(member.joinedAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}
                • **Discord:** ${moment(member.user.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
            .addField(`❯ Roles [${member.roles.cache.filter(f => f.name !== "@everyone").size}]`, stripIndents`
                • **Highest:** ${member.roles.highest.name}
                • **List:** ${roles}`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(userEmbed);
    }
};