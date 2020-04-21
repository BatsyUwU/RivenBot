const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { stripIndents } = require("common-tags");
const moment = require("moment");
const osu = require("node-os-utils");
const os = require("os");
require("moment-duration-format");

module.exports = {
    config: {
        name: "stats",
        aliases: ["specs"],
        category: "information",
        description: "Displays the bots staticics!",
        usage: "",
        example: "",
        accessableby: "Members"
    },
    run: async (bot, message) => {
        let freeRAM = os.freemem();
        let usedRAM = os.totalmem() - freeRAM;

        let full = "▰";
        let empty = "▱";
        let diagramMaker = (used,free) => {
            let total = used + free;
            used = Math.round((used / total) * 10);
            free = Math.round((free / total) * 10);
            return full.repeat(used) + empty.repeat(free);
        };

        let cpuUsage;
        
        const p1 = osu.cpu.usage().then(cpuPercentage => {
            cpuUsage = cpuPercentage;
        });

        await Promise.all([p1]);

        const roleColor = message.guild.me.roles.highest.hexColor;
    
        const statsEmbed = new MessageEmbed()
            .setColor(roleColor === "#000000" ? Colors.CUSTOM : roleColor)
            .setAuthor(`${bot.user.username}"s statistics information`, bot.user.avatarURL({ dynamic: true }))
            .addField(`Used`, stripIndents`
                RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]
                CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]`)
            .addField(`Machine`, stripIndents`
                CPU Cores: ${osu.cpu.count()} Cores
                CPU Model: ${os.cpus()[0].model}
                CPU Speed: ${os.cpus()[0].speed}MHz
                Total RAM: ${Math.round(os.totalmem / 1000000000)}GBs`)
            .addField(`Operation System`, `${os.type} ${os.release} ${os.arch}`)
            .addField(`Uptime`, stripIndents`
                Bot: ${moment.duration(bot.uptime).format("D [days], H [hrs], m [mins], s [secs]")}
                Host: ${moment.duration(os.uptime*1000).format("D [days], H [hrs], m [mins], s [secs]")}
                Proccess: ${moment.duration(process.uptime()*1000).format("D [days], H [hrs], m [mins], s [secs]")}`)
            .setFooter(`Last started on ${moment(bot.readyAt).format("ddd, DD MMMM YYYY HH:mm")}`);

        message.channel.send(statsEmbed);
    }
};
