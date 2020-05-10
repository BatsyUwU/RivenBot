const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Status");

module.exports = (client) => {
	const load = (dirs) => {
		const commands = readdirSync(`./src/modules/commands/${dirs}/`).filter((file) => file.endsWith(".js"));
		for (let file of commands) {
			let pull = require(`../modules/commands/${dirs}/${file}`);
			if (pull.config.name) {
                client.commands.set(pull.config.name, pull);
                table.addRow(file, "✅");
            } else {
                table.addRow(file, "❌  -> missing a help.name, or help.name is not a string.");
                continue;
            }
			if (pull.config.aliases) {
				pull.config.aliases.forEach((a) => client.aliases.set(a, pull.config.name));
			}
		}
	};
	["administrator", "fun", "information", "miscellaneous", "moderation", "music", "nsfw", "owner", "searches", "sfw", "utilities"].forEach((x) => load(x));
	console.log(table.toString());
};