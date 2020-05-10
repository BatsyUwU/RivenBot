const { MessageEmbed, version: discordVersion } = require("discord.js");
const { Access, Colors, Client, Emotes } = require("../../../utils/configs/settings");
const { version } = require("../../../../package.json");
const { stripIndents } = require("common-tags");
const moment = require("moment");

module.exports = {
    config: {
        name: "about",
        aliases: ["botinfo", "info"],
        category: "information",
        description: "Shows some information about the running instance!",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (bot, message) => {
        const Owner = bot.users.cache.get(Access.OWNERS) || await bot.fetchUser(Access.OWNERS);

        let status = {
            "online": `${Emotes.ONLINE} Online`,
            "idle": `${Emotes.IDLE} Idle`,
            "dnd": `${Emotes.DND} Do Not Disturb`,
            "invisible": `${Emotes.OFFLINE} Offline`
        };

        const roleColor = message.guild.me.roles.highest.hexColor;

        const aboutEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle(`__Information About ${bot.user.username}__`)
            .setDescription(`Hiya, I'm ${bot.user.username}... I'll be your server assistant & multipurpose bot!\nYou can use \`${Client.PREFIX}help\` to get all my commands.`)
            .setThumbnail(bot.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("General Information", stripIndents`**❯ Username:** ${bot.user.tag}
            **❯ ID:** ${bot.user.id}
            **❯ Creator:** ${Owner.tag}
            **❯ Status:** ${status[bot.user.presence.status]}
            **❯ Version:** v${version}
            **❯ Node:** [${process.version}](https://nodejs.org/)
            **❯ Library:** [Discord.js v${discordVersion}](https://discord.js.org/)
            **❯ Invitation Link:** [Invite ${bot.user.username}](https://discordapp.com/oauth2/authorize?&client_id=${bot.user.id}&scope=bot&permissions=805314622) | [Support Server](https://discord.gg/GG69j8w)
            **❯ Discord Join Date:** ${moment(bot.user.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
            .addField("Statistics", stripIndents`**❯ Guild Count:** ${bot.guilds.cache.size}
            **❯ Member Count:** ${bot.users.cache.size}
            **❯ Channels Count:** ${bot.channels.cache.size}
            **❯ Command Count:** ${bot.commands.size}`)
            .setFooter(`Based on ${bot.user.username} | Powered by Heroku`, bot.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(aboutEmbed);
    }
};
