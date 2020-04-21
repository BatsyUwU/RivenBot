const { MessageEmbed } = require("discord.js");
const { Action, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const moment = require("moment");
const ms = require("ms");

module.exports = {
    config: {
        name: "lockdown",
        aliases: ["lock", "ld"],
        category: "moderation",
        description: "Locks a channel down for a set duration. Use \`lockdown release\` to end the lockdown prematurely.",
        usage: "<duration> <sec|min|hr>",
        example: "5 min",
        accessableby: "Moderators"
	},
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return Errors.userPerms(message, "Manage Messages");
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return Errors.botPerms(message, "Manage Messages");

        if (!bot.lockit) bot.lockit = [];
        const time = args.join(" ");
        const validUnlocks = ["release", "rel", "unlock", "end", "stop"];
        if (!time) return Errors.wrongText(message, "A duration for the lockdown must be set. This can be in hours, minutes or seconds.");

        let sendChannel = message.guild.channels.cache.find(c => c.name === Action.INCIDENT);

        const roleColor = message.guild.me.roles.highest.hexColor;

        if (validUnlocks.includes(time)) {
            message.channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: null
            }).then(() => {
                message.channel.send("Lockdown lifted.").then(m => m.delete({timeout: 5000}));
                clearTimeout(bot.lockit[message.channel.id]);
                delete bot.lockit[message.channel.id];
            });
        } else {
            message.channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            }).then(() => {
                const lockEmbed = new MessageEmbed()
                    .setColor(roleColor === '#000000' ? Colors.CUSTOM : roleColor)
                    .setAuthor("Channel locked down", message.guild.iconURL({ dynamic: true }))
                    .setDescription(stripIndents`
                    **Channel:** #${message.channel.name} (${message.channel.id})
                    **Issued by:** ${message.author.tag} (${message.author.id})
                    **Duration:** ${ms(ms(time), { long: true })}
                    **Date & Time:** ${moment(message.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
                    .setFooter(`Moderation system powered by ${bot.user.username}`, bot.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                
                sendChannel.send(lockEmbed).then(() => {
                    bot.lockit[message.channel.id] = setTimeout(() => {
                        message.channel.updateOverwrite(message.guild.id, {
                            SEND_MESSAGES: null
                        }).then(message.channel.send("Lockdown lifted.").then(m => m.delete({timeout: 5000}))).catch(console.error);
                        delete bot.lockit[message.channel.id];
                    }, ms(time));
                });
            });
        };
    }
};
