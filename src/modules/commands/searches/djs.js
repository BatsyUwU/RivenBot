const axios = require("axios");

module.exports = {
    config: {
        name: "djs",
        aliases: ["discord-js"],
        category: "searches",
        description: "Searches the DJS docs for whatever you\'d like",
        usage: "<query> (branch)",
        example: "embed setAuthor",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const query = args.join(" ");

        axios.get(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`).then((res) => {
            const embed = res.data;
            
            if (embed && !embed.error) {
                message.channel.send({ embed });
            } else {
                message.reply(`I don't know mate, but "${query}" doesn't make any sense!`)
            }
        }).catch(() => {
            message.reply("Darn it! I failed!");
        });
    }
};