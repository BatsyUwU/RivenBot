# Akira Bot

<p align="center">
<br>
<a> 
    <img src="https://img.shields.io/discord/439323863139090434.svg?color=7289da&logo=discord&logoColor=white&label=Support&style=for-the-badge" alt="Support">
</a>
<a href="https://travis-ci.com/XRzky/AkiraBot">
    <img src="https://img.shields.io/travis/com/XRzky/AkiraBot/beta.svg?logo=travis&logoColor=white&style=for-the-badge" alt="Build">
</a>
<a>
    <img src="https://img.shields.io/github/languages/top/XRzky/AkiraBot.svg?color=f0db4f&logo=javascript&logoColor=white&style=for-the-badge" alt="Languages">
</a>
<a>
    <img src="https://img.shields.io/github/license/XRzky/AkiraBot?color=blue&style=for-the-badge" alt="License">
</a>
<br>
<a href="https://github.com/XRzky/AkiraBot/tree/beta">
    <img src="https://img.shields.io/github/package-json/v/XRzky/AkiraBot/beta.svg?label=Version&logo=node.js&logoColor=white&style=for-the-badge" alt="Version">
</a>
<a href="https://github.com/XRzky/AkiraBot/issues">
    <img src="https://img.shields.io/github/issues/XRzky/AkiraBot.svg?color=37f149&logo=github&logoColor=white&style=for-the-badge" alt="Issues">
</a>
<a href="https://github.com/XRzky/AkiraBot/pulls">
    <img src="https://img.shields.io/github/issues-pr/XRzky/AkiraBot.svg?color=37f149&logo=github&logoColor=white&style=for-the-badge" alt="Pull Request">
</a>
</p>

---

<i>Akira is a Discord bot intended to be able to perform various tasks, ranging from simple server moderation (Kick, ban etc.)

this bot was made in
[Node.JS](https://nodejs.org),
using the [Discord.js](https://discord.js.org/#/) library.
</i>

## Features
- Moderation commands (kick, ban etc)
- And more...

## Installation
Clone the repository
```
git clone -b beta https://github.com/XRzky/AkiraBot.git
```
Install Node dependencies
```
npm install
```
Configuration
```
Create a .env and copy the contents from sample.env and replace the info with your details
```
Run the bot!
```
node src/bot.js
```

## Configuration
You can find all settings in the **settings.js** file, without filling in all the details some features might not work as expected. Below you can find a quick summary of all settings in the **.env** file

| Key                  | Value                         | Example      |
| :---                 | :---                          | :---         |
| `BOT_TOKEN`          | Your discord api token        | NjQ4XXXXXX   |
| `CHANNEL_JOIN`       | Channel for welcome greeter   | join-leave   |
| `CHANNEL_LEAVE`      | Channel for left guild        | join-leave   |
| `CHANNEL_INCIDENT`   | Channel for incident guild    | incident     |
| `OPEN_WEATHER_APPID` | Input your OpenWeather AppID  | 0c58XXXXXX   |
| `OWNER_ID`           | Your discord id               | 4275XXXXXX   |
| `PREFIX`             | Prefix to use before commands | ?            |
| `TZ`                 | Localhost timezone            | Asia/Jakarta |

## Contributing
If you want to contribute to this project you can follow the steps below.
Not a programmer? You can always [open an issue](https://github.com/XRzky/AkiraBot/issues/new) and share your ideas!
More information about contributing can be found [here](.github/CONTRIBUTING.md).
