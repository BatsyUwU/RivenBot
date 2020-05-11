const { Clients } = require("../../../utils/configs/settings");
const activities = require("../../../assets/json/activities");

module.exports = (client) => {
    console.log(`${client.user.username} is online on ${client.guilds.cache.size} servers!`);

    setInterval(function() {
        let activity = `${Clients.PREFIX}help | ${activities[Math.floor(Math.random() * activities.length)]}`;
        client.user.setActivity(activity, {type: "PLAYING"}); //PLAYING, LISTENING, WATCHING, STREAMING

    }, 300000);
};
