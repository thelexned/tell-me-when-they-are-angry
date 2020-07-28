const sentimentAnalyzer = require("../../../../src/scheduled/tweet-sentiment-analyzer/service/sentiment-analyzer");

describe("SentimentAnalyzer", () => {
    describe("#enrichWithSentiment", () => {
        test("adds sentiment score to object", () => {
            const text = "This test is great."
            const enrichedWithSentiment = sentimentAnalyzer.enrichWithSentiment({text});
            expect(enrichedWithSentiment.text).toEqual(text);
            expect(enrichedWithSentiment.sentiment).toBeDefined();
        });
    });

    describe("#isNegativeSentiment", () => {
        test("checks if the sentiment is negative", () => {
            const isNegativeSentiment = sentimentAnalyzer.isNegativeSentiment({sentiment: -1});
            expect(isNegativeSentiment).toEqual(true);
        });
        test("checks if the sentiment is positive", () => {
            const isNegativeSentiment = sentimentAnalyzer.isNegativeSentiment({sentiment: 1});
            expect(isNegativeSentiment).toEqual(false);
        });
    });
});
