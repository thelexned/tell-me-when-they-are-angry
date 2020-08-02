const notificationsPublisher = require('../../../../src/scheduled/tweet-sentiment-analyzer/service/notifications-publisher');
const arc = require('@architect/functions');

describe("NotificationPublisher", () => {
    describe("#publishTheyAreAngryEvent", () => {
        test("publishes the event for when they are angry", async () => {
            const angryMentions = [
                "https://twitter.com/2731688051/status/1284460924083019776"
            ];
            const eventsPublishSpy = spyOn(arc.events, 'publish');
            await notificationsPublisher.publishTheyAreAngryEvent(angryMentions);
            expect(eventsPublishSpy).toHaveBeenCalledTimes(1);
            expect(eventsPublishSpy).toHaveBeenCalledWith({
                name: 'they-are-angry',
                payload: angryMentions,
            });
        });
    });
});
