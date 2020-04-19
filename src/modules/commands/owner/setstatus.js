const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "setstatus",
        aliases: ["status"],
        category: "owner",
        description: "Sets bot's presence/status.",
        usage: "<online/idle/dnd/invisible>",
        example: "idle",
        accessableby: "Owners"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };

        if(message.author.id !== Access.OWNERS) return Errors.ownerAccess(message);

        const statusType = args.join("");
        
        if (!message.content.includes("online") && !message.content.includes("idle") && !message.content.includes("dnd") && !message.content.includes("invisible"))
            return Errors.ownerAccess(message, `Please input one of the following: \`online\`, \`idle\`, \`dnd\` or \`invisible\` and try again.`);
        
        await bot.user.setStatus(`${statusType}`)
        message.channel.send(`Status successfully changed to \`${statusType}\`.\nPlease note that initially changing status may take up to a minute or two.`)
        .then(m => m.delete({ timeout: 10000 }))
        .catch(e => {
            message.reply("Something went wrong while changing my status. I\'ve logged the error in the console.");
            return console.error(e);
        });
    }
};
