const { MessageEmbed } = require("discord.js");
const { Action, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
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
            return Errors.wrongText(message, "You must mention a user to mute.");
        };
    
        let muteReason = args.slice(1).join(" ");
        if(!muteReason) {
            return Errors.wrongText(message, "Please enter a reason for the mute...");
        }
    
        let muteRole = message.guild.roles.cache.find((r) => r.name === "Muted");
        if(!muteRole) {
            try{
                muteRole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#514F48",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muteRole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
            }
        }

        muteMember.roles.add(muteRole.id).then(() => {
            muteMember.send(`Hello, you have been muted in **${message.guild.name}**\nReason: ${muteReason}`);
            message.channel.send(`**${muteMember.user.username}**, was successfully muted.`).then((m) => m.delete({ timeout: 5000 }));
        });
    
        let muteEmbed = new MessageEmbed()
            .setColor(Colors.GREY)
            .setAuthor("Muted Member", muteMember.user.avatarURL({ dynamic: true }))
            .setDescription(stripIndents`**Muted By:** ${message.author.tag} (${message.author.id})
            **Muted User:** ${muteMember.user.tag} (${muteMember.user.id})
            **Reason:** ${muteReason}
            **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
            .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.avatarURL({ dynamic: true }))
            .setTimestamp();
    
        let sendChannel = message.guild.channels.cache.find((c) => c.name === Action.INCIDENT);
        sendChannel.send(muteEmbed);
    }
};