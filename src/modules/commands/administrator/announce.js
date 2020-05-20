const { MessageEmbed } = require("discord.js");
const { Client, Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");

module.exports = {
    config: {
        name: "announce",
        aliases: ["bc", "broadcast"],
        category: "administrator",
        description: "Send an announcement using the bot.",
        usage: "<title> | <description> | <channelname>",
        example: "Maintenance | Tomorrow maintenance server | #generals",
        accessableby: "Moderators"
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
    
        if (!args.length) return message.channel.send(
            new MessageEmbed().setTitle("Attention!").setColor(Colors.ORANGE).setDescription("You must include a valid title and description").setFooter(message.author.tag, message.author.displayAvatarURL())
        );

        const roleColor = message.guild.me.roles.highest.hexColor;
    
        const data = args.join(" ").split(/(\||;)/).map(i => i.trim());
        const m = await message.channel.send("Proccessing...");
    
        const title = data[0];
        const desc = data[2];
        const annchannel = message.mentions.channels.first();
        if (!title || !desc || !annchannel) return m.edit(new MessageEmbed().setTitle("Attention!").setColor(Colors.ORANGE).setDescription(`Incorrect usage. Run \`${Client.PREFIX}help announce\` for usage.`).setFooter(message.author.tag, message.author.displayAvatarURL()));
    
        const ann = new MessageEmbed()
            .setTitle(title)
            .setDescription(desc)
            .setColor(roleColor === '#000000' ? '#ffffff' : roleColor);
    
        const done = new MessageEmbed()
            .setTitle("Attention!")
            .setDescription("Your message has successfully been announced!")
            .setColor(Colors.GREEN)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
            .setTimestamp();
    
        annchannel.send(ann);
        m.edit(done);
    }
};
