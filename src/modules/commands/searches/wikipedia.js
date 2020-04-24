const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const fetch = require("node-fetch");

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
    run: async (bot, message, args) => {
        let query = args.join(" ");
        if(!query) return Errors.wrongText(message, "Please provide query to search on Wikipedia");

        fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`).then(response => response.json()).then(article => {
            if(!article.content_urls) return Errors.resStatus("404", message, "I couldn't find a wikipedia article with that title!");

            const articleEmbed = new MessageEmbed()
                .setColor(Colors.WIKIPEDIA)
                .setAuthor("Wikipedia Search Engine", "https://i.imgur.com/fnhlGh5.png", "https://en.wikipedia.org/")
                .setTitle(article.title)
                .setURL(article.content_urls.desktop.page)
                .setDescription(article.extract)
                .setThumbnail(article.originalimage.source)
                .setFooter(`Requested by ${message.author.tag} | Powered by Wikipedia`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send(articleEmbed);
        });
    }
};