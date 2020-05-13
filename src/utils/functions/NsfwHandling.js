const { MessageEmbed } = require("discord.js");
const { Colors } = require("../configs/settings");
const { promptMessage } = require("./general");
const { stripIndents } = require("common-tags");

module.exports.handleValidation = async (send, message) => {
    const validEmbed = new MessageEmbed()
        .setColor(Colors.ORANGE)
        .setTitle("WARNING!")
        .setDescription(stripIndents`⚠️ You are doing something that you shouldn't!\n
        This command contains adult content, make sure you are 18+ and use it on NSFW channels.\n
        __*This message and you will be autodestruct in 10 seconds if you don't confirm.*__`)
        .setTimestamp();

    await message.channel.send(validEmbed).then(async msg => {
        const emoji = await promptMessage(msg, message.author, 10, "✅");
        if (emoji === "✅") {
            msg.delete();
            message.channel.send(send);
        } else {
            msg.delete();
            message.delete();
        }
    });
};