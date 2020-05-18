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

        const result = await npm(query, {sortBy: "popularity"});

        const npmEmbed = new MessageEmbed()
            .setColor(Colors.RED)
            .setAuthor("NPM Search Engine", "https://i.imgur.com/CJ70ktz.png", "https://www.npmjs.com/")
            .setTitle(result[0].name)
            .setURL(result[0].links ? result[0].links.npm : "None")
            .setDescription(stripIndents`
                _Version:_ **${result[0].version}**
                _Publisher:_ ${result[0].publisher.username}
                _Date:_ ${moment(result[0].date).format("MMMM D, YYYY")}
                _Repository:_ ${result[0].links.repository ? result[0].links.repository : "None"}
                _Description:_ ${result[0].description ? result[0].description : "None"}
                _Keywords:_ ${result[0].keywords ? result[0].keywords.join(", ") : "None"}`)
            .setFooter("Powered by NPM")
            .setTimestamp();
        
        message.channel.send(npmEmbed);
    }
};