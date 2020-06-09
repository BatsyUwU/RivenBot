const { readdirSync } = require("fs");

module.exports = (client) => {
	const load = (dirs) => {
		const commands = readdirSync(`./src/modules/commands/${dirs}/`).filter((file) => file.endsWith(".js"));
		for (let file of commands) {
			let pull = require(`../modules/commands/${dirs}/${file}`);
			client.commands.set(pull.config.name, pull);
			if (pull.config.aliases) {
				pull.config.aliases.forEach((a) => client.aliases.set(a, pull.config.name));
			}
		}
	};
	["action", "administrator", "fun", "information", "miscellaneous", "moderation", "music", "nsfw", "owner", "searches", "utilities"].forEach((x) => load(x));
};