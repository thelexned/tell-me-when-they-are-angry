const mentionsRepository = require("./repository/mentions-repository");
const tweetsRepository = require("./repository/tweets-repository");
const notificationsPublisher = require("./service/notifications-publisher");
const handler = require('./handler');

describe('Handler', () => {
    describe('#handle', () => {
        test('publishes the links to angry mentions', async () => {
            const mentions = [
                {
                    id_str: 1,
                    created_at: '12-02-2019',
                    text: 'Cats are stupid',
                    user: {
                        id: 2
                    }
                },
                {
                    id_str: 2,
                    created_at: '14-02-2019',
                    text: 'Cats are awesome',
                    user: {
                        id: 3
                    }
                }
            ];
            const lastProcessedMentionId = 123;
            spyOn(mentionsRepository, 'getLastProcessedMentionId')
                .and.returnValue(Promise.resolve(lastProcessedMentionId));
            spyOn(tweetsRepository, 'getMentions')
                .and.returnValue(Promise.resolve(mentions));
            const notificationsPublisherPublishSpy = spyOn(notificationsPublisher, 'publishTheyAreAngryEvent')
                .and.returnValue(Promise.resolve());
            const mentionsRepositorySaveSpy = spyOn(mentionsRepository, 'saveLastProcessedMentionId')
                .and.returnValue(Promise.resolve());
            await handler.handle();
            expect(mentionsRepositorySaveSpy).toHaveBeenCalledWith(1);
            expect(notificationsPublisherPublishSpy).toHaveBeenCalledWith([{
                "id": 1,
                "createdAt": "12-02-2019",
                "text": "Cats are stupid",
                "userId": 2,
                "url": "https://twitter.com/2/status/1",
                "sentiment": -2
            }]);
        });
        test('does not publish anything given no angry mentions', async () => {
            const mentions = [
                {
                    id_str: 1,
                    created_at: '12-02-2019',
                    text: 'Cats are the best',
                    user: {
                        id: 2
                    }
                },
                {
                    id_str: 2,
                    created_at: '14-02-2019',
                    text: 'Cats are awesome',
                    user: {
                        id: 3
                    }
                }
            ];
            const lastProcessedMentionId = 123;
            spyOn(mentionsRepository, 'getLastProcessedMentionId')
                .and.returnValue(Promise.resolve(lastProcessedMentionId));
            spyOn(tweetsRepository, 'getMentions')
                .and.returnValue(Promise.resolve(mentions));
            const notificationsPublisherPublishSpy = spyOn(notificationsPublisher, 'publishTheyAreAngryEvent')
                .and.returnValue(Promise.resolve());
            const mentionsRepositorySaveSpy = spyOn(mentionsRepository, 'saveLastProcessedMentionId')
                .and.returnValue(Promise.resolve());
            await handler.handle();
            expect(mentionsRepositorySaveSpy).toHaveBeenCalledTimes(0);
            expect(notificationsPublisherPublishSpy).toHaveBeenCalledTimes(0);
        });
    });
});
