const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

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
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the current song.** :x:");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**Nothing playing.**");
        }
        
        let embed = new MessageEmbed()
            .setColor(Colors.NAVY)
            .setTitle(":musical_note: **Now Playing** :musical_note:")
            .setDescription(`[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`)
            .addField("Duration", `${serverQueue.songs[0].duration}`, true)
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    }
};