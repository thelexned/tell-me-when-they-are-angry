const tweetsMapper = require("./tweets-mapper");

describe("TweetsMapper", () => {
    describe("#simplifyTweet", () => {
        test("maps input to needed properties", () => {
            const tweet = {
                id_str: 1,
                created_at: '12-02-2019',
                text: 'Test text',
                user: {
                    id: 2
                },
            }
            const simplifiedTweet = tweetsMapper.simplifyTweet(tweet);
            expect(simplifiedTweet.id).toEqual(tweet.id_str);
            expect(simplifiedTweet.createdAt).toEqual(tweet.created_at);
            expect(simplifiedTweet.text).toEqual(tweet.text);
            expect(simplifiedTweet.userId).toEqual(tweet.user.id);
        });
    });
});