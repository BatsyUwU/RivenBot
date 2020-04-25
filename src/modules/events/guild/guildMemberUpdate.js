const { MessageEmbed } = require("discord.js");
const { Action, Colors } = require("../../../utils/configs/settings");

module.exports = async (bot, oldMember, newMember) => {
    const sendChannel = newMember.guild.channels.cache.find((ch) => ch.name === `${Action.INCIDENT}`);

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
    };

    if (oldMember.roles !== newMember.roles) {
        let addedRole = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id));
        if (!addedRole.first()) {
            return;
        };

        const rolesAddEmbed = new MessageEmbed()
            .setColor(Colors.GREEN)
            .setAuthor("Role Given", newMember.user.avatarURL({ dynamic: true }))
            .setDescription(`**${newMember.user.tag}** has been given a role`)
            .setThumbnail(newMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 4096 }))
            .addField("Role", `${addedRole.first().name} (${addedRole.first().id})`)
            .setFooter(`ID: ${newMember.user.id}`)
            .setTimestamp();

        sendChannel.send(rolesAddEmbed);
    }
};