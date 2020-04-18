const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "restart",
        aliases: ["reboot"],
        category: "owner",
        description: "If running under PM2, the bot will restart.",
        usage: "",
        example: "",
        accessableby: "Owner"
    },
    run: async (bot, message) => {
        if (message.deletable) {
            message.delete()
        };

        if(message.author.id !== Access.OWNERS) return Errors.ownerAccess(message);

        try{
            await message.channel.send("Rebooting, please wait...");
            process.exit(1);
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`);
        };
    }
};