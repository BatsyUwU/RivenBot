const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "setstatus",
        aliases: ["status"],
        category: "owner",
        description: "Sets bot's presence/status.",
        usage: "<online | idle | dnd | invisible>",
        example: "idle",
        accessableby: "Owners"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete();
        };

        if(message.author.id !== Access.OWNERS) {
            return Errors.ownerAccess(message);
        };

        const status = args[0];
        
        if (!status) {
            return Errors.wrongText(message, "Please input one of the following: \`online\`, \`idle\`, \`dnd\` or \`invisible\` and try again.");
        }
        
        const statusType = args[0].toLowerCase();

        if (statusType === "online" || statusType === "idle" || statusType === "dnd" || statusType === "invisible") {
            bot.user.setStatus(status);
            message.channel.send(`Status successfully changed to **${statusType}**.\nPlease note that initially changing status may take up to a minute or two.`).then((m) => m.delete({ timeout: 10000 }));
        } else {
            return Errors.wrongText(message, `"${statusType}" is not a valid status type.`);
        }
    }
};
