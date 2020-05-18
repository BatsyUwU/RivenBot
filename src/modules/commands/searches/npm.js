const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const npm = require("libnpmsearch");
const moment = require("moment");

module.exports = {
    config: {
        name: "npm",
        aliases: [],
        category: "searches",
        description: "Searches for packages on the npm registry.",
        usage: "<query>",
        example: "discord.js",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const query = args.join(" ");
        if (!query) {
            return message.client.embed.errors("noQuery", message);
        }

        npm(query, {sortBy: "popularity"}).then((res) => {
            const npmEmbed = new MessageEmbed()
            .setColor(Colors.NPM)
            .setAuthor("NPM Search Engine", "https://i.imgur.com/7hzjnuJ.png", "https://www.npmjs.com/")
            .setTitle(res[0].name)
            .setURL(res[0].links ? res[0].links.npm : "None")
            .setThumbnail(`https://i.imgur.com/CJ70ktz.png`)
            .setDescription(res[0].description ? res[0].description : "None")
            .addField("__**Details**__", stripIndents`
                _Version:_ **${res[0].version}**
                _Publisher:_ **${res[0].publisher.username}**
                _Date:_ **${moment(res[0].date).format("MMMM D, YYYY")}**
                _Repository:_ **${res[0].links.repository ? res[0].links.repository : "None"}**
                _Keywords:_ **${res[0].keywords ? res[0].keywords.join(", ") : "None"}**`)
            .setFooter("Powered by NPM")
            .setTimestamp();
        
        message.channel.send(npmEmbed);
        }).catch(() => {
            return message.client.embed.errors("invalidQuery", message);
        });
    }
};