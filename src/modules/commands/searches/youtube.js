const { MessageEmbed } = require("discord.js");
const { Access, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const fetch = require("node-fetch");

module.exports = {
    config: {
        name: "youtube",
        aliases: ["yt"],
        category: "searches",
        description: "Searches for a video on youtube",
        usage: "<query>",
        example: "Fortnite",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (!args[0]) {
            return Errors.wrongCmd(message, "youtube");
        }

        fetch(`https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${args}&maxResults=1&type=video&key=${Access.YOUTUBE}`).then((res) => res.json()).then((search) => {
            try {
                const youtubeEmbed = new MessageEmbed()
                    .setColor(Colors.YOUTUBE)
                    .setAuthor("YouTube Search Engine", "https://i.imgur.com/lbS6Vil.png", "https://youtube.com/")
                    .setTitle(search.items[0].snippet.title)
                    .setURL(`https://www.youtube.com/watch?v=${search.items[0].id.videoId}`)
                    .setDescription(stripIndents`
                    **${search.items[0].snippet.channelTitle}**
                    ${search.items[0].snippet.description}`)
                    .setImage(search.items[0].snippet.thumbnails.high.url)
                    .setFooter(`Requested by ${message.author.tag} | Powered by YouTube`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();

                message.channel.send(youtubeEmbed);
            } catch (error) {
                return Errors.resStatus("404", message, "I can't find a video matching that query!");
            }
        });
    }
};