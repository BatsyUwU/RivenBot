const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const fetch = require("node-fetch");
const moment = require("moment");

module.exports = {
    config: {
        name: "github",
        aliases: ["git"],
        category: "searches",
        description: "Searches github for a user, organisation or repository",
        usage: "<users/repos> <username> <repository>",
        example: "repos XRzky AkiraBot",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if (!args[0]) {
            return Errors.wrongCmd(message, "github");
        };
        
        if (args[0] === "users") {
            let username = args[1];
            if(!username) {
                return Errors.wrongText(message, "Please provide a valid github account to search.");
            };
            
            fetch(`https://api.github.com/users/${username}`).then((res) => res.json()).then((users) => {
                if(users.message) {
                    return Errors.resStatus("404", message, `I wasnt able to find \`${username}\` on the github website!`);
                }

                const usersEmbed = new MessageEmbed()
                    .setColor(Colors.GITHUB)
                    .setAuthor("GitHub Search Engine", "https://i.imgur.com/4EDz1aY.png", "https://github.com/")
                    .setTitle(users.login)
                    .setURL(users.html_url)
                    .setThumbnail(users.avatar_url)
                    .setDescription(`${users.bio || "[No bio set]"}`)
                    .addField("Name", `${users.name || "Not Public."}`, true)
                    .addField("ID", `${users.id || "Unknown"}`, true)
                    .addField("Updated", `${moment(users.updated_at, "YYYYMMDDHHmmss").fromNow()}`, true)
                    .addField("Location", `${users.location || "Invisible."}`, false)
                    .addField("Repositories", `${users.public_repos}`, true)
                    .addField("Followers", `${users.followers}`, true)
                    .addField("Following", `${users.following}`, true)
                    .addField("Created", `${moment(users.created_at).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (${moment(users.created_at, "YYYYMMDDHHmmss").fromNow()})`, false)
                    .setFooter(`Requested by ${message.author.tag} | Powered by GitHub`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();
                    
                message.channel.send(usersEmbed);
            });
        } else if (args[0] === "repos") {
            let user = args[1];
            if (!user) {
                return Errors.wrongText(message, "Please provide the repository owner's username or organisation name.");
            };

            let repo = args[2];
            if (!repo) {
                return Errors.wrongText(message, "Please provide a repository name to search for.");
            }

            fetch(`https://api.github.com/repos/${user}/${repo}`).then((res) => res.json()).then((repos) => {
                if(repos.message) {
                    return Errors.resStatus("404", message, `I wasnt able to find \`${user}/${repo}\` on the github website!`);
                }

                const reposEmbed = new MessageEmbed()
                    .setColor(Colors.GITHUB)
                    .setAuthor("GitHub Search Engine", "https://i.imgur.com/e4HunUm.png", "https://github.com/")
                    .setTitle(repos.full_name)
                    .setURL(repos.html_url)
                    .setThumbnail(repos.owner.avatar_url)
                    .setDescription(repos.description ? repos.description : "[No description set]")
                    .addField("Updated", moment(repos.updated_at, "YYYYMMDDHHmmss").fromNow(), true)
                    .addField("Pushed", moment(repos.pushed_at, "YYYYMMDDHHmmss").fromNow(), true)
                    .addField("Created", `${moment(repos.created_at).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (${moment(repos.created_at, "YYYYMMDDHHmmss").fromNow()})`, false)
                    .addField("Stars", repos.stargazers_count, true)
                    .addField("Forks", repos.forks, true)
                    .addField("Issues", repos.open_issues, true)
                    .addField("Language", repos.language || "No language", true)
                    .addField("License", repos.license ? repos.license.spdx_id : "Unlicensed", true)
                    .addField("Archived", repos.archived.toString() === "True" ? "Yes" : "No", true)
                    .setFooter(`Requested by ${message.author.tag} | Powered by GitHub`, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp();

                message.channel.send(reposEmbed);
            });
        }
    }
};