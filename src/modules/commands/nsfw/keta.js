const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { handleValidation } = require("../../../utils/functions/NsfwHandling");
const Errors = require("../../../utils/functions/errors");
const client = require("nekos.life");
const neko = new client();

module.exports = {
    config: {
        name: "keta",
        aliases: [],
        category: "nsfw",
        description: "Posts a random keta picture. Warning this commands for 18+",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!message.channel.nsfw) return Errors.nsfwAccess(message);

        const roleColor = message.guild.me.roles.highest.hexColor;

        message.channel.startTyping();
        neko.nsfw.keta().then(async img => {
            const embed = new MessageEmbed()
                .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                .setImage(img.url)
                .setFooter("Powered by nekos.life")
                .setTimestamp();
            
            handleValidation(embed, message);
        });
        message.channel.stopTyping(true);
    }
};