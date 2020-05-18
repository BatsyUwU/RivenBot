const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const axios = require("axios");

module.exports = {
    config: {
        name: "shorten",
        aliases: ["isgd", "urlshortner", "shorten-url"],
        category: "miscellaneous",
        description: "Shortens the specified link.",
        usage: "<URL>",
        example: "https://www.youtube.com/",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const input = args.join("");
        if (!input) {
            return message.client.embed.errors("commonError", message, "Please provide a link to shorten.");
        }

        const roleColor = message.guild.me.roles.highest.hexColor;

        const headers = {"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36"};
        const json = await axios.get(`https://is.gd/create.php?format=json&url=${input.trim()}`, {headers}).then((res) => res.data);

        const shortenEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("Shorten Link")
            .setDescription(json.shorturl)
            .setFooter("Powered by is.gd")
            .setTimestamp();
        
        message.channel.send(shortenEmbed);
    }
};