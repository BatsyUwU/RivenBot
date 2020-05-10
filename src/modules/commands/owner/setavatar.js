const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "setavatar",
        aliases: ["sa", "setav"],
        category: "owner",
        description: "Sets the avatar of the Bots Account",
        usage: "<link>",
        example: "send image",
        accessableby: "Owner"
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        if(message.author.id != Access.OWNERS) {
            return Errors.ownerAccess(message);
        }

        if (!args || args.length < 1) {
            return Errors.wrongText(message, "Please provide me with a valid link to set my avatar.");
        }

        client.user.setAvatar(args.join(" "));

        message.channel.send("Profile photo has been changed!").then((m) => m.delete({ timeout: 5000 }));
    }
};