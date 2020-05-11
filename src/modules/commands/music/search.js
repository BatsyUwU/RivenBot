const { MessageEmbed } = require("discord.js");
const { Access, Colors } = require("../../../utils/configs/settings");
const { handleVideo } = require("../../../utils/functions/MusicHandling");
const ytapi = require("simple-youtube-api");
const he = require("he");
const youtube = new ytapi(Access.YOUTUBE);

const idx = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];

module.exports = {
    config: {
        name: "search",
        aliases: [],
        category: "music",
        description: "Searches for up to 10 videos from YouTube.",
        usage: "<song>",
        example: "",
        accessableby: "Members"
    },
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("You must be in a voice channel first!")
            return message.channel.send(embed);
        }
        if (!args[0]) {
            return message.channel.send("You have to search for a song!");
        }
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot speak in this voice channel, make sure I have the proper permissions!");
        let video;
        try {
            const videos = await youtube.searchVideos(args.join(" "), 10);
            if (!videos.length) {
                const embed = new MessageEmbed()
                    .setColor(Colors.GOLD)
                    .setTitle("❌ Error")
                    .setDescription(`No songs found with the search term: ${args.join(" ")}.`)
                return message.channel.send(embed);
            }
            let index = 0;
            const embed = new MessageEmbed()
                .setAuthor("🔍 Song Selection")
                .setDescription(`${videos.map(video2 => `**${idx[index++]} -** ${he.decode(video2.title)}`).join("\n")}`)
                .setFooter("Please provide a value to select one of the search results ranging from 0️⃣-9️⃣.")
                .setColor(Colors.GOLD);
            message.channel.send(embed);
            const response = await message.channel.awaitMessages(msg2 => (msg2.content > -1 && msg2.content < 10) && msg2.author.id === message.author.id, { max: 1, time: 10000, errors: ["time"]});
            if (!response) {
                const embed = new MessageEmbed()
                    .setColor(Colors.GOLD)
                    .setTitle("❌ Error")
                    .setDescription("No or invalid value entered, cancelling video selection.")
                return message.channel.send(embed);
            }
            const videoIndex = parseInt(response.first().content);
            video = await youtube.getVideoByID(videos[videoIndex].id);
        } catch (err) {
            console.log(err);
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("I could not obtain any search results.")
            return message.channel.send(embed);
        }
        return handleVideo(video, message, voiceChannel);
    }
};