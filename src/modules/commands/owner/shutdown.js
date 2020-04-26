const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "shutdown",
        aliases: ["kill", "endprocess", "shut-down"],
        category: "owner",
        description: "Shuts down the bot.",
        usage: "",
        example: "",
        accessableby: "Owner"
    },
    run: async (bot, message) => {
        if (message.deletable) {
            message.delete();
        }

        if(message.author.id !== Access.OWNERS) {
            return Errors.ownerAccess(message);
        }

        try{
            await message.channel.send("Shutting down... 👋");
            process.exit();
        } catch(e) {
            message.channel.send(`ERROR: ${e.message}`);
        }
    }
};