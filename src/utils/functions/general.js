module.exports = {
    getMember: function(message, toFind = "") {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);
        
        if (!target && message.mentions.members) { 
            target = message.mentions.members.first();
        }

        if (!target && toFind) {
            target = message.guild.members.cache.find((member) => {
                return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
            });
        }
            
        if (!target) {
            target = message.member;
        }
            
        return target;
    },
    formatNumber: function(number) {
        return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    },
    isEmpty: async (obj) => {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) return false;
        }
        return true;
    },
    promptMessage: async function (message, author, time, validReactions) {
        time *= 1000;

        for (const reaction of validReactions) await message.react(reaction);
        
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    },
    resolveUser: async (message, search) => {
        let user = null;
        if(!search || typeof search !== "string") return;
        // Try ID search
        if(search.match(/^<@!?(\d+)>$/)){
            let id = search.match(/^<@!?(\d+)>$/)[1];
            user = message.client.users.fetch(id).catch((err) => {});
            if(user) return user;
        }
        // Try username search
        if(search.match(/^!?(\w+)#(\d+)$/)){
            let username = search.match(/^!?(\w+)#(\d+)$/)[0];
            let discriminator = search.match(/^!?(\w+)#(\d+)$/)[1];
            user = message.client.users.find((u) => u.username === username && u.discriminator === discriminator);
            if(user) return user;
        }
        user = await message.client.users.fetch(search).catch(() => {});
        return user;
    }
};