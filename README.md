<h1 align="center">Akira Bot</h1>

<p align="center">
<a>
    <img src="https://img.shields.io/badge/Built%20With-%E2%9D%A4-%23C13A3A?&style=for-the-badge" alt="Support">
</a>
<a href="https://travis-ci.com/XRzky/AkiraBot">
    <img src="https://img.shields.io/travis/com/XRzky/AkiraBot/beta.svg?style=for-the-badge" alt="Build">
</a>
<a>
    <img src="https://img.shields.io/github/languages/top/XRzky/AkiraBot.svg?color=f0db4f&style=for-the-badge" alt="Languages">
</a>
<a>
    <img src="https://img.shields.io/github/license/XRzky/AkiraBot?color=blue&style=for-the-badge" alt="License">
</a>
<br>
<a href="https://github.com/XRzky/AkiraBot/tree/beta">
    <img src="https://img.shields.io/github/package-json/v/XRzky/AkiraBot/beta.svg?label=Version&style=for-the-badge" alt="Version">
</a>
<a href="https://github.com/XRzky/AkiraBot/issues">
    <img src="https://img.shields.io/github/issues/XRzky/AkiraBot.svg?color=37f149&style=for-the-badge" alt="Issues">
</a>
<a href="https://github.com/XRzky/AkiraBot/pulls">
    <img src="https://img.shields.io/github/issues-pr/XRzky/AkiraBot.svg?color=37f149&style=for-the-badge" alt="Pull Request">
</a>
</p>

---

<i>Akira is a Multipurpose Discord bot that is intended to be able to perform various tasks, ranging from simple server
moderation (ban, kick, etc.) to other functions such as the ability to search, weather forecasts, and many more in 
upcoming updates.

this bot was made in
[Node.JS](https://nodejs.org),
using the [Discord.js](https://discord.js.org/#/) library.
</i>

---

## Features
- Moderation commands (ban, kick, etc.).
- Search for anime on MyAnimeList.
- Search for YouTube videos.
- Weather forecast.
- And many more...

## Installation
```dosini
# Clone this repository
$ git clone -b beta https://github.com/XRzky/AkiraBot.git

# Install Node dependencies
$ npm install

# Copy example.env to .env and replace it with your value
$ cp example.env .env

# Run the bot!
$ node src/bot.js
```

## Configuration
You can find all the settings in the **settings.js** file, without filling in all the details, some features may not function as expected. Below you can find a quick summary of all the settings in the **.env** file.

```dosini
BOT_TOKEN=Input here your Discord bot token
CHANNEL_GREETING=Input here your channel name for the welcome greeting
CHANNEL_INCIDENT=Input here your channel name for each incident on the server
OPEN_WEATHER_APPID=Input here your OpenWeather AppID. Otherwise the weather command does not work
OWNER_ID=Input here your ID as the bot owner
PREFIX=Input here the prefix for your bot. To use before the command is carried out. Example: ?
TZ=Input here the time zone location for your localhost. Example: Asia/Jakarta
YOUTUBE_API_KEY=Input here your YouTube API. Otherwise the youtube command does not work
```

## Contributing
If you want to contribute to this project you can follow the steps below.
Not a programmer? You can always [open an issue](https://github.com/XRzky/AkiraBot/issues/new) and share your ideas!
More information about contributing can be found [here](.github/CONTRIBUTING.md).
