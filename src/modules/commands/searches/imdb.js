const { MessageEmbed } = require("discord.js");
const { Access, Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const moment = require("moment");
const IMDB = require("imdb-api");

module.exports = {
    config: {
        name: "imdb",
        aliases: ["movie"],
        category: "searches",
        description: "Searches IMDd for your query, getting movie/TV series results.",
        usage: "<query>",
        example: "Avengers: Endgame",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const query = args.join(" ");
        if (!query) return Errors.wrongText(message, "Please give the name of movie or series");

        IMDB.get({name: query}, {apiKey: Access.IMDB}).then((res) => {
            const movieEmbed = new MessageEmbed()
                .setColor(Colors.IMDB)
                .setAuthor("IMDb Search Engine", "https://i.imgur.com/0BTAjjv.png", "https://www.imdb.com/")
                .setTitle(res.title)
                .setURL(res.imdburl)
                .setThumbnail(res.poster)
                .setDescription(res.plot)
                .addField("Rated", res.rated, true)
                .addField("Runtime", res.runtime, true)
                .addField("Released", `${moment(res.released).format("DD MMMM YYYY")}`, true)
                .addField("Ratings", `${res.rating}/10 ⭐\nby ${res.votes} users`, true)
                .addField("Metascores", `${res.metascore}/100\nFrom [metacritic](https://metacritic.com)`, true)
                .addField("Type", `${res.type.slice(0, 1).toUpperCase()}${res.type.slice(1)}`, true)
                .addField("Genres", res.genres, false)
                .addField("Directors", res.director, true)
                .addField("Cast", res.actors, true)
                .addField("Writers", res.writer, false)
                .addField("Production", res.production || "Unknown", true)
                .addField("Country", res.country, true)
                .addField("Language", res.languages, true)
                .setFooter(`Requested by ${message.author.tag} | Powered by IMDb`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();

                if (res.awards !== "N/A") {
                    movieEmbed.addField("Awards", res.awards, false);
                }

                if (res.series === true) {
                    movieEmbed.addField("Total Seasons", res.totalseasons, true);
                    movieEmbed.addField("Released Year", res._year_data, true);
                }

            message.channel.send(movieEmbed);
        }).catch(err => {
            if (err.message.startsWith("Movie not found!:")) return Errors.resStatus("404", message, "Request not found, make sure you have written the title correctly");
        });
    }
};