const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { Client, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "halp", "commands"],
        category: "core",
        description: "Displays all commands that the bot has.",
        usage: "[command | alias]",
        example: "ping",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const roleColor = message.guild.me.roles.highest.hexColor;
        
        const embed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setAuthor(`${bot.user.username} Help`, message.guild.iconURL())
            .setThumbnail(bot.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }));

        if(!args[0]) {
            const categories = readdirSync("./src/modules/commands/");

            embed.setDescription(`These are the avaliable commands for ${bot.user.username}.\nThe bot prefix is: **${Client.PREFIX}**`);
            embed.setFooter(`Based on ${bot.user.username} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL())
            embed.setTimestamp();

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" | "));
                } catch(e) {
                    console.log(e);
                };
            });

            return message.channel.send(embed);
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${Client.PREFIX}help\` for the list of the commands.`));
            command = command.config;

            embed.setDescription(stripIndents` The bot's prefix is: \`${Client.PREFIX}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}
            **Description:** ${command.description || "No Description provided."}
            **Category:** ${command.category.slice(0, 1).toUpperCase() + command.category.slice(1)}
            **Usage:** ${command.usage ? `\`${Client.PREFIX}${command.name} ${command.usage}\`` : `\`${Client.PREFIX}${command.name}\``}
            **Example:** ${command.example ? `\`${Client.PREFIX}${command.name} ${command.example}\`` : "None."}
            **Accessible by:** ${command.accessableby || "Members"}`);
            embed.setFooter(`Syntax: <> = required, [] = optional`)
            embed.setTimestamp();

            return message.channel.send(embed);
        };
    }
};