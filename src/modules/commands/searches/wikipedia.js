const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const axios = require("axios");

module.exports = {
    config: {
        name: "wikipedia",
        aliases: ["wiki"],
        category: "searches",
        description: "Searches Wikipedia Article use title",
        usage: "<query>",
        example: "Google",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        let query = args.join(" ");
        if(!query) {
            return Errors.wrongText(message, "Please provide query to search on Wikipedia");
        }

        axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`).then((res) => {
            const article = res.data;

            if(!article.content_urls) {
                return Errors.resStatus("404", message, "I couldn't find a wikipedia article with that title!");
            }

            const articleEmbed = new MessageEmbed()
                .setColor(Colors.WIKIPEDIA)
                .setAuthor("Wikipedia Search Engine", "https://i.imgur.com/C665mkB.png", "https://en.wikipedia.org/")
                .setTitle(article.title)
                .setURL(article.content_urls.desktop.page)
                .setThumbnail(article.originalimage ? article.originalimage.source : null)
                .setDescription(article.extract)
                .setFooter("Powered by Wikipedia")
                .setTimestamp();

            message.channel.send(articleEmbed);
        });
    }
};