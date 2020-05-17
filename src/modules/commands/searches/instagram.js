const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { formatNumber } = require("../../../utils/functions/general");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const axios = require("axios");

module.exports = {
    config: {
        name: "instagram",
        aliases: ["ig"],
        category: "searches",
        description: "Find out some nice instagram statistics",
        usage: "<username>",
        example: "hnxtasia",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const name = args.join(" ");
        if (!name) {
            return Errors.wrongText(message, "Maybe it's useful to actually search for someone...!");
        }

        axios.get(`https://instagram.com/${name}/?__a=1`).then((ig) => {
            const account = ig.data.graphql.user;

            const instagramEmbed = new MessageEmbed()
                .setColor(Colors.INSTAGRAM)
                .setAuthor("Instagram Search Engine", "https://i.imgur.com/wgMjJvq.png", "https://instagram.com/")
                .setTitle(account.full_name)
                .setURL(`https://instagram.com/${name}`)
                .setThumbnail(account.profile_pic_url_hd)
                .setDescription(stripIndents`
                    ${account.biography.length === 0 ? "None" : account.biography}
                    ${account.external_url || " "}`)
                .addField("Username", `@${account.username}`, true)
                .addField("Verified", account.is_verified ? "Yes" : "No", true)
                .addField("Private", account.is_private ? "Yes 🔐" : "No 🔓", true)
                .addField("Posts", formatNumber(account.edge_owner_to_timeline_media.count), true)
                .addField("Followers", formatNumber(account.edge_followed_by.count), true)
                .addField("Following", formatNumber(account.edge_follow.count), true)
                .setFooter("Powered by Instagram")
                .setTimestamp();
                
         message.channel.send(instagramEmbed);
        }).catch(() => {
            return Errors.resStatus("404", message, "I couldn't find that account... :(");
        });
    }
};