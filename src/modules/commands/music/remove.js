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
        const { channel } = message.member.voice;

        if(!channel){
            return message.channel.send("**You need to be a voice channel to skip a song!**");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if(!serverQueue){
            return message.channel.send("**There is nothing playing.**");
        }

        let song = args[0];
        if(song < 1 || song >= serverQueue.songs.length + 1 || isNaN(song)){
            return message.channel.send("**Enter a valid song number**");
        }

        serverQueue.songs.splice(song - 1, 1);

        message.channel.send(`**Song ${song} removed**`);
    }
};