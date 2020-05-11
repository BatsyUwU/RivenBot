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
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You need to be a voice channel to skip a song!**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        serverQueue.connection.dispatcher.end();
        message.channel.send(":track_next: **Skipping the song...**");
    }
};