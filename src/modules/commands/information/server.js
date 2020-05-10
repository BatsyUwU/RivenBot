const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const moment = require("moment");

module.exports = {
    config: {
        name: "server",
        aliases: ["sinfo", "serverinfo", "guildinfo", "guild"],
        category: "information",
        description: "Displays information about the current server.",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (client, message) => {
        let region = {
            "brazil": ":flag_br: Brazil",
            "europe": ":flag_eu: Europe",
            "hongkong": ":flag_hk: Hong Kong",
            "india": ":flag_in: India",
            "japan": ":flag_jp: Japan",
            "russia": ":flag_ru: Russia",
            "singapore": ":flag_sg: Singapore",
            "southafrica": ":flag_za: South Africa",
            "sydney": ":flag_au: Sydney",
            "us-central": ":flag_us: U.S. Central",
            "us-east": ":flag_us: U.S. East",
            "us-south": ":flag_us: U.S. South",
            "us-west": ":flag_us: U.S. West"
        };

        const verificationLevels = {
            "NONE": "None",
            "LOW": "Low",
            "MEDIUM": "Medium",
            "HIGH": "(╯°□°）╯︵ ┻━┻",
            "VERY_HIGH": "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻"
        };

        const contentFilterLevels = {
            "DISABLED": "None",
            "MEMBERS_WITHOUT_ROLES": "Medium",
            "ALL_MEMBERS": "High"
        };
        
        const roleColor = message.guild.me.roles.highest.hexColor;
        
        let serverEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setAuthor(`Server Information for ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("❯ Details", stripIndents`
                • **ID:** ${message.guild.id}
                • **Created:** ${moment(message.guild.createdAt).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")}
                • **Owner:** ${message.guild.owner.user.tag}
                • **Region:** ${region[message.guild.region]}
                • **Verification:** ${verificationLevels[message.guild.verificationLevel]}`)
            .addField("❯ Channels", stripIndents`
                • **Categories:** ${message.guild.channels.cache.filter((ch) => ch.type === "category").size}
                • **Text:** ${message.guild.channels.cache.filter((ch) => ch.type === "text").size}
                • **Voice:** ${message.guild.channels.cache.filter((ch) => ch.type === "voice").size}
                • **AFK:** ${message.guild.afkChannel ? message.guild.afkChannel.name : "None"}`, true)
            .addField("❯ Users", stripIndents`
                • **Humans:** ${message.guild.memberCount - message.guild.members.cache.filter((m) => m.user.bot).size}
                • **Bots:** ${message.guild.members.cache.filter((m) => m.user.bot).size}
                • **Members:** ${message.guild.memberCount}`, true)
            .addField("❯ Other", stripIndents`
                • **AFK:** After ${message.guild.afkTimeout / 60} min
                • **Large?** ${message.guild.large.toString()}
                • **Content filter:** ${contentFilterLevels[message.guild.explicitContentFilter]}`, true)
            .addField(`❯ Roles [${message.guild.roles.cache.filter((f) => f.name !== "@everyone").size}]`, stripIndents`
                • **List:** ${message.guild.roles.cache.sort((a, b) => b.position - a.position).filter((f) => f.name !== "@everyone").map((r) => r.name).join(", ")}`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(serverEmbed);
    }
};
