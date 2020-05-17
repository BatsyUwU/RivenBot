const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const moment = require("moment-timezone");
const axios = require("axios");

module.exports = {
    config: {
        name: "time",
        aliases: ["clock", "now"],
        category: "miscellaneous",
        description: "Gets the current time in a city.",
        usage: "<city/country>",
        example: "Jakarta",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const headers = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36"}

        const city = args.join(" ");
        if (!city) return message.reply(`What city do you want to search for`);

        const timezones = await axios.get(`http://worldtimeapi.org/api/timezone`, {headers}).then((res) => res.data);

        const zone = timezones.find((z= any) => z.toLowerCase().includes(city.toLowerCase().replace(/ +/g, "_")));
        if (!zone) return message.reply("Could not find that city!");

        const cityName = zone.replace(/\//g, " ").replace("America", "").replace(/_/g, " ").trim();

        const roleColor = message.guild.me.roles.highest.hexColor;

        const timeEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("⌚ Times")
            .setDescription(stripIndents`
                _City:_ **${cityName}**
                _Timezone:_ \`${moment().tz(`${zone}`).format("[GMT] Z")}\`
                _Date:_ \`${moment().tz(`${zone}`).format("dddd, DD MMMM YYYY")}\`
                _Current Time:_ \`${moment().tz(`${zone}`).format("HH:mm:ss")}\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send(timeEmbed);
    }
};