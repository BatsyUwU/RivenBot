const Command = require('../../../structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { Colors } = require('../../../structures/Configuration.js');
const { handleValidation } = require('../../../utils/NsfwHandling.js');
const Client = require('nekos.life');
const { nsfw } = new Client();

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'cumsluts',
			aliases: ['cumslut', 'cs'],
			description: 'Posts a random cumsluts picture. Warning this commands for 18+',
			category: 'nsfw',
			guildOnly: true,
			clientPerms: ['SEND_MESSAGES', 'EMBED_LINKS'],
			nsfw: true
		});
	}

	async run(message) {
		const roleColor = message.guild.me.roles.highest.hexColor;

		message.channel.startTyping(true);
		// eslint-disable-next-line no-sequences
		nsfw[['cumArts', 'cumsluts'].random()]().then(async res => {
			const embed = new MessageEmbed()
				.setColor(roleColor === '#000000' ? Colors.DEFAULT : roleColor)
				.setImage(res.url)
				.setFooter(`Responded in ${this.client.functions.responseTime(message)} | Powered by nekos.life`, message.author.avatarURL({ dynamic: true }));

			handleValidation(embed, message);
		});
		message.channel.stopTyping(true);
	}

};
