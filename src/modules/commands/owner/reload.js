const { readdirSync } = require("fs");
const { join } = require("path");
const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "reload",
        aliases: [""],
        category: "owner",
        description: "Reloads a command that has been modified.",
        usage: "<command>",
        example: "ping",
        accessableby: "Owner"
    },
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        };

        if(message.author.id !== Access.OWNERS) { 
            return Errors.ownerAccess(message);
        };

        if(!args[0]) {
            return Errors.wrongText(message, "You must provide a command to reload.");
        };
        
        const commandName = args[0].toLowerCase();
        if(!client.commands.get(commandName)) {
            return Errors.wrongText(message, "That command doesn't exist. Try again.");
        }
        
        readdirSync(join(__dirname, "..")).forEach((f) => {
            let files = readdirSync(join(__dirname,"..",f));
            if(files.includes(commandName + ".js")) {
                try {
                    delete require.cache[require.resolve(`../${f}/${commandName}.js`)];
                    client.commands.delete(commandName);
                    const pull = require(`../${f}/${commandName}.js`);
                    client.commands.set(commandName, pull);
                    return message.channel.send(`Successfully reloaded \`${commandName}.js\`!`).then((m) => m.delete({timeout: 30000}));
                } catch(e) {
                    return message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``).then((m) => m.delete({timeout: 30000}));
                }
            }
        });
    }
};