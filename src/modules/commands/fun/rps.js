const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { promptMessage } = require("../../../utils/functions/general");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    config: {
        name: "rps",
        aliases: [],
        category: "fun",
        description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const roleColor = message.guild.me.roles.highest.hexColor;
        
        const embed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setTitle("Rock Paper Scissors")
            .setDescription("Choose emojis to start the game!")
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            .setTimestamp();

        const m = await message.channel.send(embed);

        const reacted = await promptMessage(m, message.author, 30, chooseArr);
        
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);

        await m.reactions.removeAll();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "You won!";
            } else if (me === clientChosen) {
                return "Its a tie!";
            } else {
                return "You lost!";
            };
        }
    }
};
