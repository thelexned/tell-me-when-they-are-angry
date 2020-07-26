const twitterMentions = require('twitter-mentions');
const tweetsRepository = require("./tweets-repository");
jest.mock('twitter-mentions');

describe("TweetsRepository", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("#getMentions", () => {
        test("retrieves all twitter mentions given the last processed id is equal to zero", async () => {
            const mentions = [
                {
                    id_str: 1,
                    created_at: '12-02-2019',
                    text: 'Test text 1',
                    user: {
                        id: 2
                    }
                },
                {
                    id_str: 2,
                    created_at: '14-02-2019',
                    text: 'Test text 2',
                    user: {
                        id: 3
                    }
                }
            ];
            twitterMentions.mockResolvedValue(mentions)
            const actual = await tweetsRepository.getMentions(0);
            expect(actual).toEqual(mentions);
            expect(twitterMentions.mock.calls.length).toEqual(1);
            expect(twitterMentions.mock.calls[0]).toEqual([{
                consumer_key: process.env.TWITTER_CONSUMER_KEY,
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
                access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
                access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
            }]);
        });

        test("retrieves all twitter mentions given the last processed id is not equal to zero", async () => {
            const lastProcessedMentionId = 123;
            const mentions = [
                {
                    id_str: 1,
                    created_at: '12-02-2019',
                    text: 'Test text 1',
                    user: {
                        id: 2
                    }
                },
                {
                    id_str: 2,
                    created_at: '14-02-2019',
                    text: 'Test text 2',
                    user: {
                        id: 3
                    }
                }
            ];
            twitterMentions.mockResolvedValue(mentions)
            const actual = await tweetsRepository.getMentions(lastProcessedMentionId);
            expect(actual).toEqual(mentions);
            expect(twitterMentions.mock.calls.length).toEqual(1);
            expect(twitterMentions.mock.calls[0]).toEqual([
                {
                    consumer_key: process.env.TWITTER_CONSUMER_KEY,
                    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                    access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
                    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
                    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
                },
                lastProcessedMentionId
            ]);
        });
    });
});
