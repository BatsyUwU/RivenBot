const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "pause",
        aliases: [],
        category: "music",
        description: "Pauses playing music.",
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
        const playlist = message.client.playlists.get(message.guild.id);
        if (!playlist.playing) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("The song is already paused!")
            return message.channel.send(embed);
        }  
        playlist.playing = false;
        playlist.connection.dispatcher.pause();
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setTitle("⏸️ Paused")
            .setDescription(`The song has been paused by ${message.member.displayName}.`)
        return message.channel.send(embed);
    }
};