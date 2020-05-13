const { MessageEmbed } = require("discord.js");
const { Colors, Emotes } = require("../../../utils/configs/settings");
const { getMember } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");
const perms = require("../../../assets/json/permissions");
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
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        let status = {
            "online": `${Emotes.ONLINE} Online`,
            "idle": `${Emotes.IDLE} Idle`,
            "dnd": `${Emotes.DND} Do Not Disturb`,
            "offline": `${Emotes.OFFLINE} Offline`
        };

        const allowed = Object.entries(member.permissions.serialize()).filter(([perm, allowed]) => allowed).map(([perm]) => `${perms[perm]}`).join(", ");

        const roles = member.roles.cache.sort((a, b) => b.position - a.position).filter((r) => r.id !== message.guild.id).map((r) => r.name).join(", ") || "None";

        const userEmbed = new MessageEmbed()
            .setColor(member.displayHexColor === "#000000" ? Colors.CUSTOM : member.displayHexColor)
            .setAuthor(`User Information for ${member.user.username}`, member.user.avatarURL({ dynamic: true }))
            .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("__**Details**__", stripIndents`
                • **Nickname:** ${member.nickname || "None"}
                • **Tag:** ${member.user.tag}
                • **ID:** ${member.user.id}
                • **Status:** ${status[member.user.presence.status]}
                • **Activity:** ${member.user.presence.activities || "None"}`)
            .addField("__**Join Dates**__", stripIndents`
                • **Server:** ${moment(member.joinedAt).format("DD/MM/YYYY HH:mm [GMT]Z")}
                • **Discord:** ${moment(member.user.createdAt).format("DD/MM/YYYY HH:mm [GMT]Z")}`)
            .addField(`__**Roles [${member.roles.cache.filter((f) => f.name !== "@everyone").size}]**__`, stripIndents`
                • **Highest:** ${member.roles.highest.name}
                • **List:** ${roles}`)
            .addField("__**Permissions**__", allowed ? allowed : "None")
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(userEmbed);
    }
};