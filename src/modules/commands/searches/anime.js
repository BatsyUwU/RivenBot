const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const malScraper = require("mal-scraper");

module.exports = {
    config: {
        name: "anime",
        aliases: ["mal"],
        category: "searches",
        description: "Searches information from my anime list.",
        usage: "<query>",
        example: "Oregairu",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const search = args.join(" ");
        if (!search) return Errors.wrongCmd(message, "anime");

        malScraper.getInfoFromName(search).then(data => {
            const animeEmbed = new MessageEmbed()
                .setColor(Colors.MAL)
                .setAuthor("My Anime List Search Engine", "https://i.imgur.com/vEy5Zaq.png", "https://myanimelist.net/")
                .setTitle(data.title)
                .setURL(data.url)
                .setThumbnail(data.picture)
                .addField("English Title", data.englishTitle || "Unknown", true)
                .addField("Japanese Title", data.japaneseTitle, true)
                .addField("Synonyms", data.synonyms || "Unknown", false)
                .addField("Rating", data.rating, true)
                .addField("Source", data.source, true)
                .addField("Genres", data.genres.join(", ").toString(), false)
                .addField("Type", data.type, true)
                .addField("Episodes", data.episodes, true)
                .addField("Duration", data.duration, true)
                .addField("Studios", data.studios, true)
                .addField("Premiered", data.premiered, true)
                .addField("Status", data.status, true)
                .addField("Aired", data.aired, true)
                .addField("Broadcast", data.broadcast, true)
                .addField("Score", `${data.score} (${data.scoreStats})`, false)
                .setFooter(`Requested by ${message.author.tag} | Powered by My Anime List`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();
            
            message.channel.send(animeEmbed);
        });
    }
};