const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "nickname",
        aliases: ["setnick", "nick"],
        category: "moderation",
        description: "Set a user nickname",
        usage: "<mention | id> <nickname>",
        example: "@Rygent Ryu",
        accessableby: "Moderations"
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) {
            return Errors.userPerms(message, "Manage Nicknames");
        };

        if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) {
            return Errors.botPerms(message, "Manage Nicknames");
        };
        
        let userNick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!userNick) {
            return Errors.noMention(message, "change nicknames");
        }

        if (userNick.hasPermission("MANAGE_NICKNAMES")) {
            return Errors.wrongText(message, `I do not have permission to edit the nickname of ${userNick}`);
        }
        
        let memberNick = args.join(" ").slice(22);
        if(!memberNick) {
            return Errors.wrongText(message, "No nickname was given!");
        }
        
        await(userNick.setNickname(memberNick));
        return message.channel.send("Their nickname was successfully changed!").then((m) => m.delete({ timeout: 5000 }));
    }    
};