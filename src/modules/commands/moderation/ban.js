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
        name: "ban",
        aliases: ["banish", "permban"],
        category: "moderation",
        description: "Bans the mentioned user from the server.",
        usage: "<user> <reason>",
        example: "@Ryevi Spamming",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        
        if (!message.member.hasPermission(["BAN_MEMBERS" || "ADMINISTRATOR"])) {
            return Errors.userPerms(message, "Ban Members");
        }

        if (!message.guild.me.hasPermission(["BAN_MEMBERS" || "ADMINISTRATOR"])) {
            return Errors.botPerms(message, "Ban Members");
        }

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!banMember) {
            return Errors.noMention(message, "Ban");
        }

        if (banMember.id === message.author.id) {
            return Errors.noYourself(message, "Ban");
        }

        if (banMember.id === Access.OWNERS) {
            return Errors.cmdOwner(message, "Ban");
        }

        if (message.guild.member(message.author).roles.highest.position <= message.guild.member(banMember).roles.highest.position) {
            return Errors.highRole(message, "Ban");
        }
    
        let banReason = args.slice(1).join(" ");
        if (!banReason) {
            Warning.reason(message, "ban");
            await message.channel.awaitMessages((m) => m.author.id === message.author.id, { "errors": ["time"], "max": 1, time: 60000 }).then((resp) => {
                resp = resp.array()[0];
                if (resp.content.toLowerCase() === "cancel") {
                    return Warning.cancel("Cancelled", message, "banned");
                }
                banReason = resp.content;
                resp.delete();
            }).catch(() => {
                Warning.cancel("Timed out", message, "banned");
            });
        }

        if (banReason) {
            if (!banMember.user.bot) {
                Direct.banDM(banMember, message, banReason);
            }
            message.guild.members.ban(banMember, { days: 7, reason: banReason});
            Success.modAction(banMember, message, "successfully banned");

            let banEmbed = new MessageEmbed()
                .setColor(Colors.RED)
                .setTitle("🚫 Member banned")
                .setThumbnail(banMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
                .setDescription(stripIndents`
                    **Punished User:** ${banMember.user.tag} (${banMember.user.id})
                    **Punished By:** ${message.author.tag} (${message.author.id})
                    **Reason:** ${banReason}
                    **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`)
                .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.avatarURL({ dynamic: true }))
                .setTimestamp();
            let sendChannel = message.guild.channels.cache.find((ch) => ch.name === Action.INCIDENT);
            sendChannel.send(banEmbed);
        }
    }
};