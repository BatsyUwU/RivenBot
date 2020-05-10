const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const moment = require("moment-timezone");

module.exports = {
    config: {
        name: "timezones",
        aliases: ["times", "worldtimes", "now"],
        category: "miscellaneous",
        description: "Returns a list of current times in popular timezones.",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const unix = Math.round(+new Date() / 1000);
        const roleColor = message.guild.me.roles.highest.hexColor;

        const timeEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("⌚ Timezones")
            .addField("❯ Africa", stripIndents`
                • EAT : [${moment().tz("Africa/Nairobi").format("HH:mm Z")}]
                • CAT : [${moment().tz("Africa/Maputo").format("HH:mm Z")}]
                • WAT : [${moment().tz("Africa/Lagos").format("HH:mm Z")}]
                • WEST : [${moment().tz("Africa/Accra").format("HH:mm Z")}]`)
            .addField("❯ America", stripIndents`
                • EDT : [${moment().tz("America/New_York").format("HH:mm Z")}]
                • CDT : [${moment().tz("America/Chicago").format("HH:mm Z")}]
                • MDT : [${moment().tz("America/Denver").format("HH:mm Z")}]
                • AKDT : [${moment().tz("America/Anchorage").format("HH:mm Z")}]
                • UTC-10 : [${moment().tz("Pacific/Honolulu").format("HH:mm Z")}]`)
            .addField("❯ Asia", stripIndents`
                • MVT : [${moment().tz("Indian/Maldives").format("HH:mm Z")}]
                • IST : [${moment().tz("Asia/Calcutta").format("HH:mm Z")}]
                • BTT : [${moment().tz("Asia/Dhaka").format("HH:mm Z")}]
                • ICT : [${moment().tz("Asia/Bangkok").format("HH:mm Z")}]
                • CST : [${moment().tz("Asia/Hong_Kong").format("HH:mm Z")}]`)
            .addField("❯ Europe", stripIndents`
                • UTC/GMT : [${moment.utc().format("HH:mm Z")}]
                • BST : [${moment().tz("Europe/London").format("HH:mm Z")}]
                • CEST : [${moment().tz("Europe/Zurich").format("HH:mm Z")}]
                • EEST : [${moment().tz("Europe/Helsinki").format("HH:mm Z")}]
                • FET : [${moment().tz("Europe/Minsk").format("HH:mm Z")}]`)
            .addField("❯ Oceania", stripIndents`
                • AWST : [${moment().tz("Australia/Perth").format("HH:mm Z")}]
                • ACST : [${moment().tz("Australia/Darwin").format("HH:mm Z")}]
                • AEST : [${moment().tz("Australia/Sydney").format("HH:mm Z")}]
                • NZST : [${moment().tz("Pacific/Auckland").format("HH:mm Z")}]`)
            .addField("❯ Other", stripIndents`
                • UNIX : [${unix}]`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(timeEmbed);
    }
};