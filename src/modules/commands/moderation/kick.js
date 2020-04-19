const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { Action, Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const moment = require("moment");

module.exports = {
    config: {
        name: "kick",
        aliases: ["boot"],
        category: "moderation",
        description: "Kicks the mentioned user from the server.",
        usage: "<user> <reason>",
        example: "@Ryevi spamming",
        accessableby: "Moderators"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };
        
        if(!message.member.hasPermission(["KICK_MEMBERS" || "ADMINISTRATOR"])) 
            return Errors.userPerms(message, "Kick Members");

        let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!kickMember) 
            return Errors.wrongText(message, "Please provide a user to kick!");
    
        let kickReason = args.slice(1).join(" ");
        if(!kickReason) 
            return Errors.wrongText(message, "You must specify a reason for the kick!");
    
        if(!message.guild.me.hasPermission(["KICK_MEMBERS" || "ADMINISTRATOR"])) 
            return Errors.botPerms(message, "Kick Members");
    
        kickMember.send(`Hello, you have been kicked from **${message.guild.name}**\nReason: ${kickReason}`).then(() => 
        kickMember.kick()).catch(err => console.log(err));

        message.channel.send(`**${kickMember.user.tag}**, has been kicked`).then(m => m.delete({ timeout: 5000 }));
    
        let kickEmbed = new MessageEmbed()
            .setColor(Colors.ORANGE)
            .setAuthor("Kicked Member", kickMember.user.avatarURL({ dynamic: true }))
            .setDescription(stripIndents`**Kicked By:** ${message.author.tag} (${message.author.id})
            **Kicked User:** ${kickMember.user.tag} (${kickMember.user.id})
            **Reason:** ${kickReason}
            **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm")}`)
            .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.avatarURL({ dynamic: true }))
            .setTimestamp();
    
        let sendChannel = message.guild.channels.cache.find(c => c.name === Action.INCIDENT);
        sendChannel.send(kickEmbed);
    }
};