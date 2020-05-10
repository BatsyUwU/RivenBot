const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "setusername",
        aliases: [""],
        category: "owner",
        description: "Changes the username of the bot.",
        usage: "<username>",
        example: "Akira",
        accessableby: "Owner"
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        if(message.author.id != Access.OWNERS) {
            return Errors.ownerAccess(message);
        }

        let nick = args.join(" ");
        if(!nick) {
            return Errors.wrongText(message, "Please input some text to set as the username!");
        }

        await(client.user.setUsername(nick));
        return message.channel.send(`Successfully change username to ${nick}`).then((m) => m.delete({ timeout: 5000 }));
    }
};