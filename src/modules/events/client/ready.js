const { Clients } = require("../../../utils/configs/settings");
const { version } = require("../../../../package.json");

module.exports = (client) => {
    console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

    let activities = [`v${version}`, `${client.guilds.cache.size} servers`, `${client.users.cache.size} users`]
    let commands = [`${Clients.PREFIX}help`, `${Clients.PREFIX}invite`]
    setInterval(function() {
        let activity = `${commands[Math.floor(Math.random() * commands.length)]} | ${activities[Math.floor(Math.random() * activities.length)]}`;
        client.user.setActivity(activity, {type: "PLAYING"}); //PLAYING, LISTENING, WATCHING, STREAMING

    }, 150000);
};
