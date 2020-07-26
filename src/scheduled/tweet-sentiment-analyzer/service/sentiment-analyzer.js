const Sentiment = require('sentiment');
const sentimentAnalyzer = new Sentiment();

function enrichWithSentiment(tweet) {
    const sentiment = sentimentAnalyzer.analyze(tweet.text);
    return {
        ... tweet,
        sentiment: sentiment.score
    }
}

function isNegativeSentiment(tweet) {
    return tweet.sentiment < 0;
}

module.exports = {
    enrichWithSentiment,
    isNegativeSentiment
}