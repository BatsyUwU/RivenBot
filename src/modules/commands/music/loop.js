const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "loop",
        aliases: ["unloop"],
        category: "music",
        description: "Loops or unloops the current playing song.",
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
        if (playlist.loop) {
            playlist.loop = false;
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("🔁 Unlooped")
                .setDescription(`The song has been unlooped by ${message.member.displayName}.`)
            return message.channel.send(embed);
        } else {
            playlist.loop = true;
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("🔁 Looped")
                .setDescription(`The song has been looped by ${message.member.displayName}.`)
            return message.channel.send(embed);
        }
    }
};