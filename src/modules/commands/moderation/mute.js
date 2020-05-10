const { MessageEmbed } = require("discord.js");
const { Access, Actions, Colors } = require("../../../utils/configs/settings");
const { isEmpty } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const Success = require("../../../utils/functions/success");
const Direct = require("../../../utils/functions/direct");
const Warning = require("../../../utils/functions/warning");
const moment = require("moment");

module.exports = {
    config: {
        name: "mute",
        aliases: ["permmute", "perm"],
        category: "moderation",
        description: "Mutes the mentioned user.",
        usage: "<@user | userID> <reason>",
        example: "@Rygent Spamming",
        accessableby: "Moderators"
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        if (!message.member.hasPermission(["MANAGE_ROLES" || "ADMINISTRATOR"])) return Errors.userPerms(message, "Manage Roles");
        if (!message.guild.me.hasPermission(["MANAGE_ROLES" || "ADMINISTRATOR"])) return Errors.botPerms(message, "Manage Roles");

        const muteRole = message.guild.roles.cache.find(role => role.name === "Muted");
        const empty = await isEmpty(muteRole);
        if (empty) {
            Warning.muteRoles(message, "A \"**Muted**\" role does not exist on this server.\nWould you like me to create one? (__Y__es / __N__o)");
            await message.channel.awaitMessages(m => m.author.id === message.author.id, { "errors": ["time"], "max": 1, time: 30000 }).then(roleRequest => {
                roleRequest = roleRequest.array()[0];
                if (roleRequest.content.toLowerCase() === "y" || roleRequest.content.toLowerCase() === "yes") {
                    message.guild.roles.create({data: { name: "Muted", color: "#514F48" }})
                        .then(role => Success.createRole(message, role.name));
                } else {
                    return Warning.customWarn("Cancelled", message, "I will not create a \"Muted\" role. You will not be able to mute users without having a \"Muted\" role.");
                }
            });
        }

        const muteMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let muteReason = args.slice(1).join(" ");

        if (!muteMember) return Errors.wrongText(message, "You must mention a user to mute.");
        if (muteMember.id === message.author.id) return Errors.noYourself(message, "Mute");
        if (muteMember.id === Access.OWNERS) return Errors.cmdOwner(message, "Mute");
        if (message.guild.member(message.author).roles.highest.position <= message.guild.member(muteMember).roles.highest.position) return Errors.highRole(message, "Mute");
        
        if (!empty) {
            if (muteMember.roles.cache.has(muteRole.id)) return Errors.wrongText(message, "The mentioned user is already muted.");
            if (!muteReason) {
                Warning.reason(message, "mute");
                await message.channel.awaitMessages(m => m.author.id === message.author.id, { "errors": ["time"], "max": 1, time: 60000 }).then(resp => {
                    resp = resp.array()[0];
                    if (resp.content.toLowerCase() === "cancel") {
                        return Warning.cancel("Cancelled", message, "muted");
                    }
                    muteReason = resp.content;
                    resp.delete();
                }).catch(() => {
                    Warning.cancel("Timed out", message, "muted");
                });
            }

            message.guild.channels.cache.forEach(async (channel) => {
                await channel.updateOverwrite(muteRole, { SEND_MESSAGES: false, ADD_REACTIONS: false, SPEAK: false });
            });

            muteMember.roles.add(muteRole.id).then(() => {
                if (!muteMember.user.bot) {
                    Direct.muteDM(muteMember, message, muteReason);
                }
                Success.modAction(muteMember, message, "muted");
            });

            const muteEmbed = new MessageEmbed()
                .setColor(Colors.GREY)
                .setTitle("🔇 Member muted")
                .setThumbnail(muteMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
                .setDescription(stripIndents`
                    **Punished User:** ${muteMember.user.tag} (${muteMember.user.id})
                    **Punished By:** ${message.author.tag} (${message.author.id})
                    **Reason:** ${muteReason}
                    **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`)
                .setFooter(`Moderation system powered by ${client.user.username}`, client.user.avatarURL({ dynamic: true }))
                .setTimestamp();

            let sendChannel = message.guild.channels.cache.find(ch => ch.name === Actions.INCIDENT);
            sendChannel.send(muteEmbed);
        }
    }
};