const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const axios = require("axios");
const h = new (require("html-entities").AllHtmlEntities)();
const categoryChoices = require("../../../assets/json/trivia/category");

module.exports = {
    config: {
        name: "trivia",
        aliases: ["randomtrivia", "randomq", "testme", "quiz"],
        category: "fun",
        description: "Puts your general knowledge to the test.",
        usage: "[difficulty] [category]",
        example: "Easy Sports",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        const roleColor = message.guild.me.roles.highest.hexColor;

            const levels = ["easy", "medium", "hard"];
            const categories = require("../../../assets/json/trivia/categories.json");

            let difficulty = "medium";
            let category = "General Knowledge";

            if (args[0]) {
                if (args[0].toLowerCase() === "categories") {
                    const embed = new MessageEmbed()
                        .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                        .setAuthor("Trivia", "https://vgy.me/9UDUk0.png")
                        .setTitle("Available categories")
                        .setDescription(`${categories.join("\n")}`)
                        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
                        .setTimestamp();

                    return message.channel.send({embed});
                } else if (!levels.includes(args[0].toLowerCase())) {
                    category = args.join(" ");
                } else {
                    difficulty = args[0].toLowerCase();
                    if (args[1]) category = args.splice(1).join(" ");
                }
            }
            if (!levels.includes(difficulty)) {
                return message.client.embed.errors("commonError", message, "Invalid difficulty specified. Please choose from one of **easy**, **medium** or **hard**.");
            }
            if (!categories.includes(category)) {
                return message.client.embed.errors("commonError", message, `Invalid category specified. Please choose from one of **${categories.join("**, **")}**.`);
            }
            const body = await axios.get(`https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&category=${categoryChoices[category]}&type=multiple`).then((res) => res.data);
            const quiz = body.results[0];
            const choices = quiz.incorrect_answers.map(ans => h.decode(ans));
            choices.push(h.decode(quiz.correct_answer));
            const randomChoices = new Array(4);
            for (let i = 0; i < 4; i++) {
                randomChoices[i] = choices[Math.floor(Math.random() * choices.length)];
                choices.splice(choices.indexOf(randomChoices[i]), 1);
            }
            const embed = new MessageEmbed()
                .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                .setAuthor("Trivia", "https://vgy.me/9UDUk0.png")
                .addField("❯ Question", `\u2000${h.decode(quiz.question)}\nA. ${randomChoices[0]}\nB. ${randomChoices[1]}\nC. ${randomChoices[2]}\nD. ${randomChoices[3]}`)
                .addField("❯ Category", h.decode(quiz.category), true)
                .addField("❯ Difficulty", h.decode(quiz.difficulty), true)
                .setFooter("React to the correct letter within 30 seconds or react ⏩ to skip!", message.author.avatarURL({ dynamic: true}));
            const msg = await message.channel.send({embed}); let ongoing = "yes";
            msg.react("🇦").then(() => msg.react("🇧")).then(() => msg.react("🇨")).then(() => msg.react("🇩")).then(() => msg.react("⏩"))
            const filter = (reaction, user) => {
                return ["🇦", "🇧", "🇨", "🇩", "⏩"].includes(reaction.emoji.name) && user === message.author && user !== client.user;
            };
            const collector = msg.createReactionCollector(filter, { time: 30000 })
            collector.on('collect', async (reaction) => {
                if (!ongoing) return await reaction.remove(reaction.users.cache.filter(user => user !== client.user).first());
                let response = null;
                if (reaction.emoji.name === "🇦") response = "A";
                else if (reaction.emoji.name === "🇧") response = "B";
                else if (reaction.emoji.name === "🇨") response = "C";
                else if (reaction.emoji.name === "🇩") response = "D";
                else response = "skip";
                await reaction.remove(reaction.users.cache.filter(user => user !== client.user).first());
                const embed = new MessageEmbed().setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
                if (response === "skip") {
                    embed.setAuthor("⏩ Skipped").setDescription(`You chose to skip the session ~~because you're dumb~~. The correct answer was **${h.decode(quiz.correct_answer)}**.`).setFooter("Trivia session ended.");
                    ongoing = undefined;
                    return message.channel.send({embed});
                }
                const choice = randomChoices[["a", "b", "c", "d"].indexOf(response.toLowerCase())];
                if (choice === h.decode(quiz.correct_answer)) embed.setAuthor("✅ Accepted").setDescription(`Congratulation! You have solved this trivia. The correct answer was ||**${h.decode(quiz.correct_answer)}**||.`).setFooter("Trivia session ended.");
                else embed.setAuthor("❌ Wrong Answer").setDescription(`Unfortunately, that's the wrong answer. The correct answer was ||**${h.decode(quiz.correct_answer)}**||, and you chose **${randomChoices[["a", "b", "c", "d"].indexOf(response.toLowerCase())]}**.`).setFooter("Trivia session ended.");
                ongoing = undefined;
                return message.channel.send({embed});
            });
            collector.on('end', async (reaction) => {
                if (!ongoing) return;
                const embed = new MessageEmbed().setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor).setAuthor("⌛ Timed out").setDescription(`The session timed out as you did not answer within 30 seconds. The correct answer was ||**${h.decode(quiz.correct_answer)}**||.`).setFooter("Trivia session ended.");
                return message.channel.send({embed});
            })
        
    }
};