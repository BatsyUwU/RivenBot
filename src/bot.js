require("dotenv").config();
const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ ws: { intents: Intents.ALL } });

client.playlists = new Collection();
client.embed = require("../src/utils/functions/Embeds");

["commands", "aliases"].forEach(collection => client[collection] = new Collection());
["command", "event"].forEach(handler => require(`./handlers/${handler}`)(client));

client.login(process.env.BOT_TOKEN);