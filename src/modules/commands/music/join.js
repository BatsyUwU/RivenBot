const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");

module.exports = {
    config: {
        name: "join",
        aliases: ["summon"],
        category: "music",
        description: "Forces the bot to join your current call.",
        usage: "",
        example: "",
        accessableby: "Members",
    },
    run: async(client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            const embed = new MessageEmbed()
                .setColor(Colors.GOLD)
                .setTitle("❌ Error")
                .setDescription("You must be in a voice channel first!")
            return message.channel.send(embed);
        }
        const permissions = voiceChannel.permissionsFor(client.user).toArray();
        if (!permissions.includes("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have the proper permissions!");
        if (!permissions.includes("SPEAK")) return message.channel.send("I cannot speak in this voice channel, make sure I have the proper permissions!");
        const embed = new MessageEmbed()
            .setColor(Colors.GOLD)
            .setTitle("✅️ Summoned")
            .setDescription(`${message.client.user.tag} has been forced to join ${voiceChannel}.`)
        return message.channel.send(embed);
    }
};