const { MessageEmbed } = require("discord.js");
const { Action, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
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
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        
        if(!message.member.hasPermission(["MANAGE_ROLES" || "ADMINISTRATOR"])) {
            return Errors.userPerms(message, "Manage Roles");
        };

        if(!message.guild.me.hasPermission(["MANAGE_ROLES" || "ADMINISTRATOR"])) {
            return Errors.botPerms(message, "Manage Roles");
        };
    
        let muteMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!muteMember) {
            return Errors.wrongText(message, "You must mention a user to unmute.");
        };
    
        let muteReason = args.slice(1).join(" ");
        if(!muteReason) {
            return Errors.wrongText(message, "Please enter a reason for unmuting this user...");
        }
    
        let muteRole = message.guild.roles.cache.find((r) => r.name === "Muted");
        if(!muteRole) {
            return message.channel.send("The mentioned user isn't muted, so I cannot unmute them.").then((m) => m.delete({ timeout: 5000 }));
        };
    
        muteMember.roles.remove(muteRole.id).then(() => {
            muteMember.send(`Hello, you have been unmuted in **${message.guild.name}**\nReason: ${muteReason}`).catch((err) => console.log(err));
            message.channel.send(`**${muteMember.user.username}**, was unmuted!`).then((m) => m.delete({ timeout: 5000 }));
        });
    
        let muteEmbed = new MessageEmbed()
            .setColor(Colors.GREEN)
            .setAuthor("Unmuted Member", muteMember.user.avatarURL({ dynamic: true }))
            .setDescription(stripIndents`**Unmuted By:** ${message.author.tag} (${message.author.id})
            **Unmuted User:** ${muteMember.user.tag} (${muteMember.user.id})
            **Reason:** ${muteReason}
            **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
            .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.avatarURL({ dynamic: true }))
            .setTimestamp();
    
        let sendChannel = message.guild.channels.cache.find((c) => c.name === Action.INCIDENT);
        sendChannel.send(muteEmbed);
    }
};