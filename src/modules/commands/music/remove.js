const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "remove",
        aliases: ["qr", "r", "queueremove"],
        category: "music",
        description: "Removes a song with given index from queue.",
        usage: "<number>",
        example: "2",
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
        if (!args[0] || Number(args[0]) < 1 || Number(args[0]) > playlist.songs.length || isNaN(Number(args[0]))) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription(`Queue index must be a value between 1 and ${playlist.songs.length}.`)
            return message.channel.send(embed);
        }
        if (message.author.tag === playlist.songs[Number(args[0]) - 1].author) {
            const song = playlist.songs[Number(args[0]) - 1].title;
            playlist.songs.splice(Number(args[0]) - 1, 1);
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("✅️ Removed")
                .setDescription(`Removed song: **${song}** with index ${args[0]}.`)
            return message.channel.send(embed);
        }
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setAuthor("⏩ Remove?")
            .setDescription("Since this song wasn't requested by you, please call upon other people to remove it by reacting to `⏩` within 60 seconds. When the number of reactions reached 3, the song will be removed.")
            .setTimestamp();
        const msg = await message.channel.send(embed);
        msg.react("⏩");
        const filter = (reaction, user) => {
            return ["⏩"].includes(reaction.emoji.name) && user !== client.user;
        };
        msg.awaitReactions(filter, { max: 3, time: 60000, errors: ['time'] }).then(collected => {
            const song = playlist.songs[Number(args[0]) - 1].title;
            playlist.songs.splice(Number(args[0]) - 1, 1);
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("✅️ Removed")
                .setDescription(`Removed song: **${song}** with index ${args[0]}.`)
            return message.channel.send(embed);
        }).catch(collected => {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setAuthor("⌛ Timed out")
                .setDescription(`Only ${collected.size} vote(s) were collected. This song will not be removed.`)
                .setTimestamp();
            return message.channel.send(embed);
        });
    }
};