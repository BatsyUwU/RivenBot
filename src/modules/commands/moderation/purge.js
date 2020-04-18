const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "purge",
        aliases: ["prune", "clear", "bulkdelete"],
        category: "moderation",
        description: "Purges (bulk-deletes) between 2 and 99 messages.",
        usage: "<number>",
        example: "100",
        accessableby: "Moderators"
	},
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return Errors.userPerms(message, "Manage Messages")
        };

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return Errors.botPerms(message, "Manage Messages")
        };

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return Errors.wrongText(message, "Yeah.... Thats not a number? I also cant delete 0 messages by the way.")
        };

        if (args[0] > 100) {
            return Errors.wrongText(message, "You can't bulk delete messages with more than 100 messages.")
        };

        const fetched = await message.channel.messages.fetch({limit: args[0]});
        
        try {
            await message.channel.bulkDelete(fetched);
            if (args[0] > 5) {
                message.channel.send(`☑️ **Successfully deleted ${args[0]} messages**`).then(msg => msg.delete({ timeout: 5000 }));
            } else return;
        } catch(err) {
            message.reply(`Something went wrong... ${err}`);
        };
    }
};
