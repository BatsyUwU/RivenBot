const { Clients } = require("../../../utils/configs/settings");
const { version } = require("../../../../package.json");

module.exports = (client) => {
    console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

    let activities = [`${Clients.PREFIX}help | v${version}`, 
    `${client.guilds.cache.size} guilds | ${client.users.cache.size} users`]
    setInterval(function() {
        let activity = `${activities[Math.floor(Math.random() * activities.length)]}`;
        client.user.setActivity(activity, {type: "PLAYING"}); //PLAYING, LISTENING, WATCHING, STREAMING

    }, 150000);
};
