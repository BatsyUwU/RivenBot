const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { Action, Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const moment = require("moment");

module.exports = {
    config: {
        name: "ban",
        aliases: ["banish", "permban"],
        category: "moderation",
        description: "Bans the mentioned user from the server.",
        usage: "<user> <reason>",
        example: "@Ryevi spamming",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };
        
        if(!message.member.hasPermission(["BAN_MEMBERS" || "ADMINISTRATOR"])) 
            return Errors.userPerms(message, "Ban Members");

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!banMember) return Errors.wrongText(message, "Please provide a user to ban!");
    
        let banReason = args.slice(1).join(" ");
        if(!banReason) return Errors.wrongText(message, "You must specify a reason for the ban!");
    
        if(!message.guild.me.hasPermission(["BAN_MEMBERS" || "ADMINISTRATOR"])) 
            return Errors.botPerms(message, "Ban Members");
    
        banMember.send(`Hello, you have been banned from **${message.guild.name}**\nReason: ${banReason}`).then(() => 
        message.guild.members.ban(banMember, { days: 1, reason: banReason})).catch(err => console.log(err));
    
        message.channel.send(`**${banMember.user.tag}**, has been banned`).then(m => m.delete({ timeout: 5000 }));
    
        let embed = new MessageEmbed()
            .setColor(Colors.RED)
            .setAuthor("Banned Member", banMember.user.avatarURL({ dynamic: true }))
            .setDescription(stripIndents`**Banned By:** ${message.author.tag} (${message.author.id})
            **Banned User:** ${banMember.user.tag} (${banMember.user.id})
            **Reason:** ${banReason}
            **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
            .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.avatarURL({ dynamic: true }))
            .setTimestamp();
    
        let sendChannel = message.guild.channels.cache.find(c => c.name === Action.INCIDENT);
        sendChannel.send(embed);
    }
}