const { MessageEmbed } = require("discord.js");
const { Colors } = require("../../../utils/configs/settings");
const { formatNumber } = require("../../../utils/functions/general");
const Errors = require("../../../utils/functions/errors");
const { NovelCovid } = require("novelcovid");
const track = new NovelCovid();
const moment = require("moment");

module.exports = {
    config: {
        name: "corona",
        aliases: ["covid"],
        category: "miscellaneous",
        description: "Shows some information about COVID-19!",
        usage: "<all | country>",
        example: "China",
        accessableby: "Members"
    },
    run: async (client, message, args) => {
        if(!args.length) {
            return Errors.wrongText(message, "Please give the name of country");
        }

        if(args.join(" ") === "all") {
            let corona = await track.all();
            
            const coronaEmbed = new MessageEmbed()
                .setColor(Colors.CUSTOM)
                .setTitle("Global Cases")
                .setDescription("Sometimes cases number may differ from small amount.")
                .addField("Cases", formatNumber(corona.cases), true)
                .addField("Deaths", formatNumber(corona.deaths), true)
                .addField("Recovered", formatNumber(corona.recovered), true)
                .addField("Today's Cases", formatNumber(corona.todayCases), true)
                .addField("Today's Deaths", formatNumber(corona.todayDeaths), true)
                .addField("Active Cases", formatNumber(corona.active), true)
                .addField("Affected Countries", formatNumber(corona.affectedCountries), false)
                .addField("Last Updated", `${moment(corona.updated).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`, false)
                .setFooter("Data provided by Johns Hopkins University")
                .setTimestamp();
            
            return message.channel.send(coronaEmbed);
        } else {
            let corona = await track.countries(args.join(" "));
            
            const coronaEmbed = new MessageEmbed()
                .setColor(Colors.CUSTOM)
                .setTitle(`${corona.country} Cases`)
                .setThumbnail(corona.countryInfo.flag)
                .setDescription("Sometimes cases number may differ from small amount.")
                .addField("Cases", formatNumber(corona.cases), true)
                .addField("Deaths", formatNumber(corona.deaths), true)
                .addField("Recovered", formatNumber(corona.recovered), true)
                .addField("Today's Cases", formatNumber(corona.todayCases), true)
                .addField("Today's Deaths", formatNumber(corona.todayDeaths), true)
                .addField("Active Cases", formatNumber(corona.active), true)
                .addField("Last Updated", `${moment(corona.updated).format("ddd, DD MMMM YYYY HH:mm [GMT]Z")} (Server Time)`, false)
                .setFooter("Data provided by Johns Hopkins University")
                .setTimestamp();
            
            return message.channel.send(coronaEmbed);
        }
    }
};
