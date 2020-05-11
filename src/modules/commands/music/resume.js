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
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You have to be in a voice channel to resume the music.**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(serverQueue && !serverQueue.playing){
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
        
            return message.channel.send(":play_pause: **Resuming**");
        }
    
        message.channel.send("**There is nothing in the queue.**")
    }
};