const { stripIndents } = require("common-tags");

module.exports = {
    config: {
        name: "ping",
        aliases: ["pong"],
        category: "information",
        description: "Displays bot latency and API response times.",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Pinging...");
        const ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
    
        if (ping <= 0) {
            return msg.edit("Please try again...");
        }
        
        return msg.edit(
            stripIndents`
            🏓 Pong: \`${ping}ms\`
            💓 Heartbeat: \`${Math.round(message.client.ws.ping)}ms\`
            `,
        );
    }
};