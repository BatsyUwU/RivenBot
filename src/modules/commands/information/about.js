const { MessageEmbed, version: discordVersion } = require("discord.js");
const { Access, Colors, Clients, Emotes } = require("../../../utils/configs/settings");
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
    run: async (client, message) => {
        const Owner = client.users.cache.get(Access.OWNERS) || await client.fetchUser(Access.OWNERS);

        let status = {
            "online": `${Emotes.ONLINE} Online`,
            "idle": `${Emotes.IDLE} Idle`,
            "dnd": `${Emotes.DND} Do Not Disturb`,
            "invisible": `${Emotes.OFFLINE} Offline`
        };

        const roleColor = message.guild.me.roles.highest.hexColor;

        const aboutEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle(`__Information About ${client.user.username}__`)
            .setDescription(`Hiya, I'm ${client.user.username}... I'll be your server assistant & multipurpose bot!\nYou can use \`${Clients.PREFIX}help\` to get all my commands.`)
            .setThumbnail(client.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("General Information", stripIndents`**❯ Username:** ${client.user.tag}
            **❯ ID:** ${client.user.id}
            **❯ Creator:** ${Owner.tag}
            **❯ Status:** ${status[client.user.presence.status]}
            **❯ Version:** v${version}
            **❯ Node:** [${process.version}](https://nodejs.org/)
            **❯ Library:** [Discord.js v${discordVersion}](https://discord.js.org/)
            **❯ Invitation Link:** [Invite ${client.user.username}](https://discordapp.com/oauth2/authorize?&client_id=${client.user.id}&scope=bot&permissions=805314622) | [Support Server](https://discord.gg/GG69j8w)
            **❯ Discord Join Date:** ${moment(client.user.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}`)
            .addField("Statistics", stripIndents`**❯ Guild Count:** ${client.guilds.cache.size}
            **❯ Member Count:** ${client.users.cache.size}
            **❯ Channels Count:** ${client.channels.cache.size}
            **❯ Command Count:** ${client.commands.size}`)
            .setFooter(`Based on ${client.user.username} | Powered by Heroku`, client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(aboutEmbed);
    }
};
