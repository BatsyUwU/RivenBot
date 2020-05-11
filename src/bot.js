require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({ partials: ["MESSAGE"] });

client.playlists = new Collection();

["commands", "aliases"].forEach(collection => client[collection] = new Collection());
["command", "event"].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.BOT_TOKEN);