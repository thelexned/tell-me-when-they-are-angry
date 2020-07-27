const mentionsRepository = require("./repository/mentions-repository");
const tweetsRepository = require("./repository/tweets-repository");
const tweetsMapper = require("./mapper/tweets-mapper");
const sentimentAnalyzer = require("./service/sentiment-analyzer");
const notificationPublisher = require("./service/notifications-publisher");

async function handle() {
    const lastProcessedMentionId = await mentionsRepository.getLastProcessedMentionId();
    const mentions = await tweetsRepository.getMentions(lastProcessedMentionId);
    const angryMentions = mentions
        .map(tweetsMapper.simplifyTweet)
        .map(sentimentAnalyzer.enrichWithSentiment)
        .filter(sentimentAnalyzer.isNegativeSentiment);

    if (angryMentions.length > 0) {
        await notificationPublisher.publishTheyAreAngryEvent(angryMentions);
        const lastMention = angryMentions[angryMentions.length - 1];
        await mentionsRepository.saveLastProcessedMentionId(lastMention.id);
    }
}

module.exports = {
    handle
}
