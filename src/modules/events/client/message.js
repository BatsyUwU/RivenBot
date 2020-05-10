const { Clients } = require("../../../utils/configs/settings");

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === "dm") {
        return
    };

    if (!message.content.startsWith(Clients.PREFIX)) {
        return
    };

    let args = message.content.slice(Clients.PREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (commandFile) {        
        commandFile.run(client, message, args);
    }
};