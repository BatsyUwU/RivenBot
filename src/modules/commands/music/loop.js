module.exports = {
    config: {
        name: "loop",
        aliases: [],
        category: "music",
        description: "Loops or unloops the current playing song.",
        usage: "",
        example: "",
        accessableby: "Members",
    },
    run: async(client, message, args) => {
        const { channel } = message.member.voice;

        if (!channel) {
            return message.channel.send("**You have to be in a voice channel to loop the queue.** :x:");
        }

        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) {
            return message.channel.send("**There is nothing playing.**");
        }

        serverQueue.loop = !serverQueue.loop;
        
        message.channel.send(`**Loop is now: ${serverQueue.loop ? "Enabled" : "Disabled"}**`);
    }
};