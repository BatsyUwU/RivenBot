const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "queue",
        aliases: ["q", "songs"],
        category: "music",
        description: "Displays the songs in the music queue.",
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
        let idx = 0;
        let out = message.client.playlists.get(message.guild.id).songs.map(song => `**${++idx}.** ${song.title}`).join("\n");
        if (out.length > 2048) {
            const { body } = post("https://www.hastebin.com/documents").send(out);
            message.channel.send(`Queue was too long, uploaded it to hastebin: https://www.hastebin.com/${body.key}.txt`);
        } else {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("📃 Queue")
                .setDescription(out)
                .addField("Now playing", message.client.playlists.get(message.guild.id).songs[0].title)
            return message.channel.send(embed);
        }
    }
};