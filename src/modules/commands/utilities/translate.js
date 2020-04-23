const { MessageEmbed } = require("discord.js");
const { Client, Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const Languages = require("../../../assets/json/translate");
const translate = require("@vitalets/google-translate-api");

module.exports = {
    config: {
        name: "translate",
        aliases: ["tl", "trans"],
        category: "utilities",
        description: "Translates your text into the desired language!",
        usage: "<from-language> <to-language> <text>",
        example: "en id Hello World",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (args[0] === "lang") {
            if (message.deletable) {
                message.delete()
            };
            
            const langEmbed = new MessageEmbed()
                .setColor(Colors.G_TRANSLATE)
                .setAuthor("Google Translate Engine", "https://cdn.discordapp.com/attachments/646882466333851672/702744617468035112/translate-round.png", "https://translate.google.com/")
                .setTitle("Available Languages")
                .setDescription(`\`\`\`JSON\n${JSON.stringify(Languages).split(',').join(',\n')}\`\`\``)
                .setFooter(`Requested by ${message.author.tag} | Powered by Google Translate`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();

            return message.channel.send(langEmbed).then(m => m.delete({ timeout: 60000 }));
        } else if (!args[0] || !args[1] || !args[2]) {
            return Errors.wrongCmd(message, "translate");
        } else if (args[0]) {
            var fromArg = args[0].toLowerCase();
            var toArg = args[1].toLowerCase();
            
            if (!Languages.hasOwnProperty(fromArg) || !Languages.hasOwnProperty(toArg)) {
                return Errors.wrongText(message, `Language not found. Check here to see the list of available languages \`${Client.PREFIX}translate lang\``);
            };

            var text = args.join(" ").split(args[0]).pop().split(args[1])[1].trim();
            if (!text) return Errors.wrongText(message, "Please provide a text for me to translate.");

            if (text.length > 2800) {
                return Errors.wrongText(message, "Unfortunately, the specified text is too long. Please try again with something a little shorter.");
            };
            
            translate(text.toLowerCase(), {from: fromArg, to: toArg}).then((res) => {
                const tranlateEmbed = new MessageEmbed()
                    .setColor(Colors.G_TRANSLATE)
                    .setAuthor("Google Translate Engine", "https://cdn.discordapp.com/attachments/646882466333851672/702744617468035112/translate-round.png", "https://translate.google.com/")
                    .setDescription(stripIndents`
                    From **${Languages[fromArg]}:**
                    ${text}\n
                    To **${Languages[toArg]}:**
                    ${res.text}`)
                    .setFooter(`Requested by ${message.author.tag} | Powered by Google Translate`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    
                return message.channel.send(tranlateEmbed);
            })
            .catch((err) => console.log(err));
        };
    }
};