const twitterMentions = require('twitter-mentions');

async function getMentions(lastProcessedMentionId) {
    const twitterAuth = {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    };

    if (lastProcessedMentionId === 0) {
        return await twitterMentions(twitterAuth);
    }

    return await twitterMentions(twitterAuth, lastProcessedMentionId);
}
module.exports = {
    getMentions
}