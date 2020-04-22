const { MessageEmbed } = require("discord.js");
const { Access } = require("../../../utils/configs/settings");
const Errors = require("../../../utils/functions/errors");
const weather = require("openweather-apis");

module.exports = {
    config: {
        name: "weather",
        aliases: [""],
        category: "utilities",
        description: "Displays weather information for the specified location.",
        usage: "<location>",
        example: "Jakarta",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let city = args.join(" ");
        if (!city) return Errors.wrongText(message, "Please provide me a city to search up!");
        
        weather.setAPPID(Access.OPENWEATHER_KEY);
        weather.setLang("en");
        weather.setUnits("metric");
        weather.setCity(city);
        weather.getAllWeather( function (err, res) {
            if (err) return message.channel.send("An Error Has occured, Try again later.");
            if (res.cod == "404" || !res.sys.country) {
                return Errors.resStatus("404", message, "Couldn't Find That Location!");
            } else if (res.cod == "401") {
                return Errors.resStatus("401", message, "Invalid API Key!");
            };

            var embedColour;
            if (res.main.temp < 0) {
                embedColour = "#addeff";
            } else if (res.main.temp < 20) {
                embedColour = "#4fb8ff";
            } else if (res.main.temp < 26) {
                embedColour = "#ffea4f";
            } else if (res.main.temp < 31) {
                embedColour = "#ffa14f"
            } else {
                embedColour = "#ff614f"
            };

            const weatherEmbed = new MessageEmbed()
                .setColor(embedColour)
                .setAuthor("Today's weather",  "https://cdn1.iconfinder.com/data/icons/weather-429/64/weather_icons_color-06-512.png")
                .setTitle(`:flag_${res.sys.country.toLowerCase()}: ${res.name} - ${res.weather[0].main}`)
                .setDescription(`${res.weather[0].description[0].toUpperCase()}${res.weather[0].description.slice(1)}`)
                .setURL(`https://openweathermap.org/city/${res.id}`)
                .setThumbnail(`https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`)
                .addField("Temperature", `${res.main.temp}°C | ${(res.main.temp*1.8+32).toFixed(2)}°F`, true)
                .addField("Feels Like", `${res.main.feels_like}°C | ${(res.main.feels_like*1.8+32).toFixed(2)}°F`, true)
                .addField("Humidity", `${res.main.humidity}%`, true)
                .addField("Min. Temp", `${res.main.temp_min}°C | ${(res.main.temp_min*1.8+32).toFixed(2)}°F`, true)
                .addField("Max. Temp", `${res.main.temp_max}°C | ${(res.main.temp_max*1.8+32).toFixed(2)}°F`, true)
                .addField("Clouds", `${res.clouds.all}%`, true)
                .addField("Pressure", `${res.main.pressure} hPa`, true)
                .addField("Wind Speed", `${(res.wind.speed*3.6).toFixed(2)} kmh | ${(res.wind.speed*2.2369).toFixed(2)} mph, ${res.wind.deg}°`, true)
                .setFooter(`Requested by ${message.author.tag} | Powered by OpenWeather`, message.author.avatarURL({ dynamic: true }))
                .setTimestamp();

            message.channel.send(weatherEmbed);
        });
    }
};