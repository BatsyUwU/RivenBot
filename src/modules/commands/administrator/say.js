const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "say",
        aliases: ["talk", "sendmsg"],
        category: "administrator",
        description: "Says your input via the bot",
        usage: "<channelname> <input>",
        example: "#general Hello World",
        accessableby: "Administrator"
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        if(!message.member.hasPermission(["ADMINISTRATOR"])) {
            return Errors.userPerms(message, "Administrator");
        }

        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return Errors.botPerms(message, "Manage Messages");
        }
    
        let argsresult;
        let sendChannel = message.mentions.channels.first();
        if(!sendChannel) {
            return message.channel.send("Please select channel first!").then(m => m.delete({ timeout: 5000 }));
        }
        
        if(sendChannel) {
            argsresult = args.slice(1).join(" ");
            sendChannel.send(argsresult);
        } else {
            argsresult = args.join(" ");
            message.channel.send(argsresult);
        }
    }
};
