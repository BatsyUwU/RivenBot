const { MessageEmbed } = require("discord.js");
const { Actions, Colors } = require("../../../utils/configs/settings");

module.exports = async (client, oldMember, newMember) => {
    const sendChannel = newMember.guild.channels.cache.find((channel) => channel.name === `${Actions.INCIDENT}`);

    if (oldMember.nickname !== newMember.nickname) {
        const nicknameEmbed = new MessageEmbed()
            .setColor(Colors.GREEN)
            .setAuthor("Nickname changed!", newMember.user.avatarURL({ dynamic: true }))
            .setDescription(`**${newMember.user.tag}** has changed their nickname`)
            .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("Old nickname", oldMember.nickname ? oldMember.nickname : "None")
            .addField("New nickname", newMember.nickname ? newMember.nickname : "None")
            .setFooter(`ID: ${newMember.user.id}`)
            .setTimestamp();

        sendChannel.send(nicknameEmbed);
    }
};