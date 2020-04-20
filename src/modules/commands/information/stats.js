const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const moment = require('moment');
const osu = require('node-os-utils');
const os = require('os');
require("moment-duration-format");

module.exports = {
    config: {
        name: 'stats',
        aliases: ['specs'],
        category: 'information',
        description: 'Displays the bots staticics!',
        usage: '',
        example: '',
        accessableby: 'Members'
    },
    run: async (bot, message) => {
        let notSupported = "Operative system not supported"
        let full = '▰'
        let empty = '▱'
        let precision = 10

        let freeRAM = os.freemem()
        let usedRAM = os.totalmem() - freeRAM;

        let diagramMaker = (used,free) => {
            let total = used + free;
            used = Math.round((used / total) * precision)
            free = Math.round((free / total) * precision)
            return full.repeat(used) + empty.repeat(free)
        }

        let cpuUsage;
        
        const p1 = osu.cpu.usage().then(cpuPercentage => {
            cpuUsage = cpuPercentage;
        })

        let processes;
        const p2 = osu.proc.totalProcesses().then(process => {
            processes = process;
        })

        let driveUsed, driveFree;
        
        const p3 = osu.drive.info().then(i => {
            driveUsed = i.usedPercentage;
            driveFree = i.freePercentage;
        }).catch(() => {
            driveUsed = false;
        })

        let networkUsage, networkUsageIn, networkUsageOut;
        
        const p4 = osu.netstat.inOut().then(i => {
            networkUsage = i.total;
            networkUsageIn = networkUsage.inputMb;
            networkUsageOut = networkUsage.outputMb;
        }).catch(() => {
            networkUsage = false;
        })
        await Promise.all([p1,p2,p3,p4]);

        const roleColor = message.guild.me.roles.highest.hexColor;
    
        const embed = new MessageEmbed()
        .setColor(roleColor === '#000000' ? '#ffffff' : roleColor)
        .setAuthor(`${bot.user.username}'s statistics information`, bot.user.avatarURL({ dynamic: true }))
        .addField(`Used:`, stripIndents`
        RAM: ${diagramMaker(usedRAM, freeRAM)} [${Math.round(100 * usedRAM / (usedRAM + freeRAM))}%]
        CPU: ${diagramMaker(cpuUsage, 100-cpuUsage)} [${Math.round(cpuUsage)}%]
        STORAGE: ${driveUsed ? `${diagramMaker(driveUsed, driveFree)} [${Math.round(driveUsed)}%]` : notSupported}
        PROCESSES: ${processes != 'not supported'? processes : notSupported}`)
        .addField(`Machine:`, stripIndents`
        CPU Cores: ${osu.cpu.count()} Cores
        CPU Model: ${os.cpus()[0].model}
        CPU Speed: ${os.cpus()[0].speed}MHz 
        ${osu.os.platform() != "win32" ? `Storage: ${diagramMaker(driveUsed,driveFree)} [${driveUsed}%]`: ""}
        Memory: ${Math.round(100 * (os.freemem / 1000000000) / 100)}GBs / ${Math.round(100 * (os.totalmem / 1000000000) / 100)}GBs`)
        .addField(`Operation System:`, `${os.type} ${os.release} ${os.arch} ${os.platform}`)
        .addField(`Network:`, `${networkUsage ? `Input Speed: ${networkUsageIn}\nOutput Speed: ${networkUsageOut}` : notSupported}`)
        .addField(`Uptime:`, stripIndents`
        Bot: ${moment.duration(bot.uptime).format("D [days], H [hrs], m [mins], s [secs]")}
        Host: ${moment.duration(os.uptime).format("D [days], H [hrs], m [mins], s [secs]")}
        Proccess: ${moment.duration(process.uptime()*1000).format("D [days], H [hrs], m [mins], s [secs]")}`)
        
        .setFooter(`Last started on ${moment(bot.readyAt).format('ddd, DD MMMM YYYY HH:mm')}`);

        message.channel.send(embed);
    }
}
