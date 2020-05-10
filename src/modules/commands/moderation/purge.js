const Errors = require("../../../utils/functions/errors");
const Success = require("../../../utils/functions/success");

module.exports = {
    config: {
        name: "purge",
        aliases: ["prune", "clear", "bulkdelete"],
        category: "moderation",
        description: "Purges (bulk-deletes) between 2 and 99 messages.",
        usage: "[bots | mention] <number>",
        example: "@Ryevi 10",
        accessableby: "Moderators"
	},
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return Errors.userPerms(message, "Manage Messages");
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return Errors.botPerms(message, "Manage Messages");
        
        const user = message.mentions.users.first();
        let amount = parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);
        if (!amount && !user) return Errors.wrongText(message, "You must specify a user and amount, or just an amount, of messages to purge.");
        if (!amount) return Errors.wrongText(message, "You must specify an amount to delete.");
        if (amount < 2 || amount > 99) return Errors.wrongText(message, "You've provided an invalid number of messages to delete. Please ensure it's between 2 and 99 (inclusive).");
        let messages = await message.channel.messages.fetch({limit: amount});

        if (user) {
            const filterBy = user ? user.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
            message.channel.bulkDelete(messages)
            .then(() => {
                Success.purgeAction(message, amount);
            })
            .catch(err => {
                if (err.message === "You can only bulk delete messages that are under 14 days old.") return Errors.wrongText(message, err.message);
            });
        } else if (args[0] === "bots") {
            messages = messages.filter(m => m.author.bot).array().slice(0, amount);
            message.channel.bulkDelete(messages)
            .then(() => {
                Success.purgeAction(message, amount);
            })
            .catch(err => {
                if (err.message === "You can only bulk delete messages that are under 14 days old.") return Errors.wrongText(message, err.message);
            });
        } else {
            message.channel.bulkDelete(messages)
            .then(() => {
                Success.purgeAction(message, amount);
            })
            .catch(err => {
                if (err.message === "You can only bulk delete messages that are under 14 days old.") return Errors.wrongText(message, err.message);
            });
        }
    }
};
