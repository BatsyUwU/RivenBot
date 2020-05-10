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
    categoryCheck: function(category, message) {
        category = category.toLowerCase();

        switch (category) {
            case "owner":
                return checkOwner(message.author.id);
    
            case "administrator":
                return message.member.permissions.toArray().join(" ").includes("ADMINISTRATOR");
                
            case "moderation":
                return message.member.permissions.toArray().join(" ").includes("MANAGE_");

            case "nsfw":
		        return !(message.channel.topic ? message.channel.topic.toLowerCase().includes('[no-nsfw]') : false) && message.channel.nsfw;
            
            default:
                return true;
        }

        function checkOwner(id) {
            return process.env.OWNER_ID.includes(id);
        }
    },
    checkOwner: function(id) {
        return process.env.OWNER_ID.includes(id);
    }
};