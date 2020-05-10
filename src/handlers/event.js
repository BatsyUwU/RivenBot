const { readdirSync } = require("fs");

module.exports = (client) => {
	const load = (dirs) => {
		const events = readdirSync(`./src/modules/events/${dirs}/`).filter((file) => file.endsWith(".js"));
		for (let file of events) {
			const evt = require(`../modules/events/${dirs}/${file}`);
			let eName = file.split(".")[0];
			client.on(eName, evt.bind(null, client));
		}
	};
	["client", "guild"].forEach((x) => load(x));
};