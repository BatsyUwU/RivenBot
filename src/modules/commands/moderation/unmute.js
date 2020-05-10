const { MessageEmbed } = require("discord.js");
const { Access, Actions, Clients, Colors } = require("../../../utils/configs/settings");
const { isEmpty } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const Success = require("../../../utils/functions/success");
const Direct = require("../../../utils/functions/direct");
const Warning = require("../../../utils/functions/warning");
const moment = require("moment");

module.exports = {
    config: {
        name: "unmute",
        aliases: [""],
        category: "moderation",
        description: "Undoes the mentioned user's mute.",
        usage: "<@user | userID> <reason>",
        example: "@Rygent Request to unmute",
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
        if (empty) return Warning.muteRoles(message, `A "Muted" role does not exist on this server. To create one, please run the \`${Clients.PREFIX}mute\` command.`);
    
        const muteMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let muteReason = args.slice(1).join(" ");

        if (!muteMember) return Errors.wrongText(message, "You must mention a user to unmute.");
        if (muteMember.id === message.author.id) return Errors.noYourself(message, "Unmute");
        if (muteMember.id === Access.OWNERS) return Errors.cmdOwner(message, "Unmute");
        if (message.guild.member(message.author).roles.highest.position <= message.guild.member(muteMember).roles.highest.position) return Errors.highRole(message, "Unmute");
        
        if (!muteReason) {
            Warning.reason(message, "unmute");
            await message.channel.awaitMessages(m => m.author.id === message.author.id, { "errors": ["time"], "max": 1, time: 60000 }).then(resp => {
                resp = resp.array()[0];
                if (resp.content.toLowerCase() === "cancel") {
                    return Warning.cancel("Cancelled", message, "unmuted");
                }
                muteReason = resp.content;
                resp.delete();
            }).catch(() => {
                Warning.cancel("Timed out", message, "unmuted");
            });
        }

        if (muteMember.roles.cache.has(muteRole.id)) {
            muteMember.roles.remove(muteRole.id).then(() => {
                if (!muteMember.user.bot) {
                    Direct.muteDM(muteMember, message, muteReason);
                }
                Success.modAction(muteMember, message, "unmuted");
            });
        } else {
            return Errors.wrongText(message, "The mentioned user isn't muted, so I cannot unmute them.");
        }
    
        const muteEmbed = new MessageEmbed()
            .setColor(Colors.GREEN)
            .setTitle("🔊 Member unmuted")
            .setThumbnail(muteMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .setDescription(stripIndents`
                **User:** ${muteMember.user.tag} (${muteMember.user.id})
                **By:** ${message.author.tag} (${message.author.id})
                **Reason:** ${muteReason}
                **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`)
            .setFooter(`Moderation system powered by ${client.user.username}`, client.user.avatarURL({ dynamic: true }))
            .setTimestamp();

        let sendChannel = message.guild.channels.cache.find(ch => ch.name === Actions.INCIDENT);
        sendChannel.send(muteEmbed);
    }
};