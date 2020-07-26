const arc = require('@architect/functions');

const NOTIFICATION_TOPIC = 'they-are-angry';

async function publishTheyAreAngryEvent(angryMentions) {
    return arc.events.publish({
        name: NOTIFICATION_TOPIC,
        payload: angryMentions,
    });
}

module.exports = {
    publishTheyAreAngryEvent
}