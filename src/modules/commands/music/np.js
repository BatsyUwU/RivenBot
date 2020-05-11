const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    config: {
        name: "np",
        aliases: ["nowplaying", "now", "current", "song"],
        category: "music",
        description: "Returns the current playing song.",
        usage: "",
        example: "",
        accessableby: "Members",
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
        if (!message.client.playlists.has(message.guild.id)) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("There is nothing playing!")
            return message.channel.send(embed);
        }
        const playingFor = message.client.playlists.get(message.guild.id).connection.dispatcher.time;
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setTitle("▶️ Now Playing")
            .setDescription(`**${message.client.playlists.get(message.guild.id).songs[0].title}**\nHas been playing for **${moment.duration(playingFor).format("H [hrs], m [mins], s [secs]")}**`)
        return message.channel.send(embed);
    }
};