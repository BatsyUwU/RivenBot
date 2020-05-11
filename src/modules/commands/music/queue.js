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
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to view the queue.**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**The queue is empty.**");
        }

        let embed = new MessageEmbed()
            .setColor(Colors.NAVY)
            .setTitle("Music Queue")
            .setDescription(`${serverQueue.songs.map((song, index) => index + 1 + ". " + `[${song.title}](${song.url})`).join("\n\n")}`,{ split: true })
            .setFooter(`© ${message.guild.me.displayName}`, client.user.displayAvatarURL());

        message.channel.send(embed);
    }
};