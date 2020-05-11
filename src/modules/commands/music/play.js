const { MessageEmbed, Util } = require("discord.js");
const { Access, Colors } = require("../../../utils/configs/settings");
const { handleVideo } = require("../../../utils/functions/MusicHandling");
const ytapi = require("simple-youtube-api"); 
const youtube = new ytapi(Access.YOUTUBE); 

module.exports = {
    config: {
        name: "play",
        aliases: ["p"],
        category: "music",
        description: "Queue a song/playlist by URL or name.",
        usage: "<url | song>",
        example: "",
        accessableby: "Members"
    },
    run: async(client, message, args) => {
        if (!args.length) {
            return message.channel.send("You have to search for a song!");
        }
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("You must be in a voice channel first!")
            return message.channel.send(embed);
        }
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        const permissions = voiceChannel.permissionsFor(client.user).toArray();
        if (!permissions.includes("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!");
        if (!permissions.includes("SPEAK")) return message.channel.send("I cannot speak in this voice channel, make sure I have the proper permissions!");
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, voiceChannel, true);
            }
            const embed = new MessageEmbed()
                .setAuthor("✅ Playlist added!")
                .setDescription(`Playlist: **${Util.escapeMarkdown(playlist.title)}** has been added to the queue!`)
                .setColor(Colors.GOLD);
            message.channel.send(embed);
        } else {
            let video;
            try {
                video = await youtube.getVideo(url);
            } catch (error) {
                const videos = await youtube.searchVideos(args.join(" "), 1);
                if (!videos.length) {
                    const embed = new MessageEmbed()
                        .setColor(Colors.GOLD)
                        .setTitle("❌ Error")
                        .setDescription(`No songs found with the search term: ${args.join(" ")}.`)
                    return message.channel.send(embed);
                }
                video = await youtube.getVideoByID(videos[0].id);   
            }
            return handleVideo(video, message, voiceChannel);
        }
    }
};