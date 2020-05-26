const { Clients } = require("../../../utils/configs/settings");

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === "dm") {
        return
    };

    const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!?${client.user.id}> `);

    if (message.content.match(mentionRegex)) {
        return message.channel.send(`My prefix for ${message.guild.name} is \`${Clients.PREFIX}\`.`);
    }

    const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : Clients.PREFIX;

    if (!message.content.startsWith(prefix)) {
        return
    };

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    if (commandFile) {        
        commandFile.run(client, message, args);
    }
};