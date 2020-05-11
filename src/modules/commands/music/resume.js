const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "resume",
        aliases: [],
        category: "music",
        description: "Resumes a paused queue.",
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
        const thisPlaylist = message.client.playlists.get(message.guild.id);
        if (thisPlaylist.playing) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("The song isn\"t paused!")
            return message.channel.send(embed);
        }
        thisPlaylist.playing = true;
        thisPlaylist.connection.dispatcher.resume();
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setTitle("▶ Resumed")
            .setDescription(`The song has been resume by ${message.member.displayName}.`)
        return message.channel.send(embed);
    }
};