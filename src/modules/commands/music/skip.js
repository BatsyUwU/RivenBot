const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "skip",
        aliases: ["s", "next"],
        category: "music",
        description: "Skip a song or songs.",
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
        if (message.author.tag === playlist.songs[0].author) {
            playlist.loop = false;
            playlist.connection.dispatcher.end("skip");
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("⏩ Skipped")
                .setDescription(`The song has been skipped by ${message.member.displayName}.`)
            return message.channel.send(embed);
        }
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setAuthor("⏩ Skip?")
            .setDescription("Since this song wasn't requested by you, please call upon other people to skip it by reacting to `⏩` within 60 seconds. When the number of reactions reached 3, the song will be skipped.")
            .setTimestamp();
        const msg = await message.channel.send(embed);
        msg.react("⏩");
        const filter = (reaction, user) => {
            return ["⏩"].includes(reaction.emoji.name) && user !== client.user;
        };
        msg.awaitReactions(filter, { max: 3, time: 60000, errors: ['time'] }).then(collected => {
            playlist.loop = false;
            playlist.connection.dispatcher.end("skip");
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("⏩ Skipped")
                .setDescription(`The song has been skipped by ${message.member.displayName}.`)
            return message.channel.send(embed);
        }).catch(collected => {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setAuthor("⌛ Timed out")
                .setDescription(`Only ${collected.size} vote(s) were collected. This song will not be skipped.`)
                .setTimestamp();
            return message.channel.send(embed);
        });
    }
};