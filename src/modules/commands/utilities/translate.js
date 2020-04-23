const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const Errors = require("../../../utils/functions/errors");
const Languages = require("../../../assets/json/translate.json");
const translate = require("@vitalets/google-translate-api");

module.exports = {
    config: {
        name: "translate",
        aliases: ["tr", "translator","trans","translat"],
        category: "utilities",
        description: "Translates a text.",
        usage: "<from-language> <to-language> <text>",
        example: "english indonesian Hello World",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (message.deletable) {
            message.delete()
        };
        
        if (args[0] === "lang") {
            const langEmbed = new MessageEmbed()
                .setColor(Colors.G_TRANSLATE)
                .setAuthor("Google Translate Engine", "https://cdn.discordapp.com/attachments/646882466333851672/702744617468035112/translate-round.png", "https://translate.google.com/")
                .setTitle("Available Languages")
                .setDescription(`\`${Languages.join((", "))}\``)
                .setFooter(`Requested by ${message.author.tag} | Powered by Google Translate`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();

            return message.channel.send(langEmbed).then(m => m.delete({ timeout: 60000 }));
        } else if (!args[0] || !args[1] || !args[2]) {
            return Errors.wrongCmd(message, "translate");
        } else if (args[0]) {
            var fromArg = args[0].toLowerCase();
            var toArg = args[1].toLowerCase();
            
            var text = args.join(" ").split(args[0]).pop().split(args[1])[1].trim();
            if (!text) return Errors.wrongText(message, "Please provide a text for me to translate.")
            
            if (!Languages.includes(fromArg)) {
                return Errors.wrongText(message, "Please provide a language for me to translate from.");
            }
            if (!Languages.includes(toArg)) {
                return Errors.wrongText(message, "Please provide a language for me to translate into.");
            }
            
            translate(text.toLowerCase(), {from: fromArg, to: toArg}).then((res) => {
                const embed = new MessageEmbed()
                    .setColor(Colors.G_TRANSLATE)
                    .setAuthor("Google Translate Engine", "https://cdn.discordapp.com/attachments/646882466333851672/702744617468035112/translate-round.png", "https://translate.google.com/")
                    .setDescription(stripIndents`
                    From **${fromArg[0].toUpperCase()}${fromArg.slice(1)}:**
                    ${text}\n
                    To **${toArg[0].toUpperCase()}${toArg.slice(1)}:**
                    ${res.text}`)
                    .setFooter(`Requested by ${message.author.tag} | Powered by Google Translate`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    
                return message.channel.send(embed);
            })
            .catch((err) => console.log(err));
        }
    }
};