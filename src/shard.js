const { ShardingManager } = require('discord.js');

require("dotenv").config()
const manager = new ShardingManager('src/index.js', { token: process.env.BOT_TOKEN });
manager.spawn('auto', 15000, 10000000);

manager.on('shardCreate', shard => console.log(`Launching Shard ${shard.id}`));