const { MessageEmbed } = require("discord.js");
const { Access, Action, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const Success = require("../../../utils/functions/success");
const Direct = require("../../../utils/functions/direct");
const Warning = require("../../../utils/functions/warning");
const moment = require("moment");

module.exports = {
    config: {
        name: "kick",
        aliases: ["boot"],
        category: "moderation",
        description: "Kicks the mentioned user from the server.",
        usage: "<user> <reason>",
        example: "@Ryevi Spamming",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        
        if (!message.member.hasPermission(["KICK_MEMBERS" || "ADMINISTRATOR"])) {
            return Errors.userPerms(message, "Kick Members");
        }

        if (!message.guild.me.hasPermission(["KICK_MEMBERS" || "ADMINISTRATOR"])) {
            return Errors.botPerms(message, "Kick Members");
        }

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!kickMember) {
            return Errors.noMention(message, "Kick");
        }

        if (kickMember.id === message.author.id) {
            return Errors.noYourself(message, "Kick");
        }

        if (kickMember.id === Access.OWNERS) {
            return Errors.cmdOwner(message, "Kick");
        }

        if (message.guild.member(message.author).roles.highest.position <= message.guild.member(kickMember).roles.highest.position) {
            return Errors.highRole(message, "Kick");
        }
    
        let kickReason = args.slice(1).join(" ");
        if (!kickReason) {
            Warning.reason(message, "kick");
            await message.channel.awaitMessages((m) => m.author.id === message.author.id, { "errors": ["time"], "max": 1, time: 60000 }).then((resp) => {
                resp = resp.array()[0];
                if (resp.content.toLowerCase() === "cancel") {
                    return Warning.cancel("Cancelled", message, "kicked");
                }
                kickReason = resp.content;
                resp.delete();
            }).catch(() => {
                Warning.cancel("Timed out", message, "kicked");
            });
        }

        if (kickReason) {
            if (!kickMember.user.bot) {
                Direct.kickDM(kickMember, message, kickReason);
            }
            kickMember.kick();
            Success.modAction(kickMember, message, "kicked out");

            let kickEmbed = new MessageEmbed()
                .setColor(Colors.ORANGE)
                .setTitle("👢 Member kicked")
                .setThumbnail(kickMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
                .setDescription(stripIndents`
                    **Punished User:** ${kickMember.user.tag} (${kickMember.user.id})
                    **Punished By:** ${message.author.tag} (${message.author.id})
                    **Reason:** ${kickReason}
                    **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`)
                .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.avatarURL({ dynamic: true }))
                .setTimestamp();
            let sendChannel = message.guild.channels.cache.find((ch) => ch.name === Action.INCIDENT);
            sendChannel.send(kickEmbed);
        }
    }
};