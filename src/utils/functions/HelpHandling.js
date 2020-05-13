module.exports = {
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
    },
    checkOwner: function(id) {
        return process.env.OWNER_ID.includes(id);
    }
};