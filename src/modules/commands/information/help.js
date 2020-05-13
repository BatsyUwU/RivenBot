const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { Clients, Colors } = require("../../../utils/configs/settings");
const { categoryCheck, checkOwner } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        category: "information",
        description: "Displays all commands that the bot has.",
        usage: "[command | alias]",
        example: "ping",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const roleColor = message.guild.me.roles.highest.hexColor;
        
        const embed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setAuthor(`${client.user.username} Help`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));

        if(!args[0] || (checkOwner(message.author.id) && args[0] == "all")) {
            const categories = readdirSync("./src/modules/commands/");

            embed.setDescription(`These are the avaliable commands for ${client.user.username}.\nThe bot prefix is: **${Clients.PREFIX}**`);
            embed.setFooter(`Based on ${client.user.username} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL({ dynamic: true }));
            embed.setTimestamp();

            categories.forEach((category) => {
                const dir = client.commands.filter(c => c.config.category === category);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
                if(args[0] === "all" || categoryCheck(category, message, client)) {
                    embed.addField(`⟐ __**${capitalise} [${dir.size}]:**__`, dir.map(c => `\`${c.config.name}\``).join(", "));
                }
            });

            let diduknow = [
                `in any text channel, you can include \`[NO-NSFW]\` in the channel topic, so every NSFW command is not executable!`,
                `commands usually have aliases? Just execute the command \`${Clients.PREFIX}help <command>\` to check them!`,
                "most of the people don't read the helpful tricks that are here?"
            ];

            embed.addField("Did you know that", diduknow[Math.floor(Math.random() * diduknow.length)]);

            return message.channel.send(embed);
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if(!command) {
                return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${Clients.PREFIX}help\` for the list of the commands.`));
            };
            command = command.config;

            embed.setDescription(stripIndents` The bot's prefix is: \`${Clients.PREFIX}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}
            **Description:** ${command.description || "No Description provided"}
            **Category:** ${command.category.slice(0, 1).toUpperCase() + command.category.slice(1)}
            **Usage:** ${command.usage ? `\`${Clients.PREFIX}${command.name} ${command.usage}\`` : `\`${Clients.PREFIX}${command.name}\``}
            **Example:** ${command.example ? `\`${Clients.PREFIX}${command.name} ${command.example}\`` : "None"}
            **Accessible by:** ${command.accessableby || "Members"}`);
            embed.setFooter("Syntax: <> = required, [] = optional");
            embed.setTimestamp();

            return message.channel.send(embed);
        }
    }
};