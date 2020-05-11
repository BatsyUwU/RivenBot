const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "stop",
        aliases: ["clear"],
        category: "music",
        description: "Stops the current playing songs and clears the queue.",
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
        const thisPlaylist = client.playlists.get(message.guild.id);
        thisPlaylist.songs = [];
        thisPlaylist.connection.dispatcher.end();
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setTitle("⏹️ Stopped")
            .setDescription(`The song has been stopped by ${message.member.displayName}.`)
        return message.channel.send(embed);
    }
};