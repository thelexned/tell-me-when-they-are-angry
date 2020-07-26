const arc = require('@architect/functions')

const LAST_PROCESSED_MENTION_ID = 1;

async function getLastProcessedMentionId() {
    const tables = await arc.tables()
    const mentionsInTable = await tables.mentions.query({key_condition_expression: `id = ${LAST_PROCESSED_MENTION_ID}`});

    if (mentionsInTable.Items && mentionsInTable.Items.length > 0) {
        return parseInt(mentionsInTable.Items[mentionsInTable.Items.length - 1].mentionId);
    }

    return 0;
}

async function saveLastProcessedMentionId(lastMentionId) {
    const tables = await arc.tables();
    tables.mentions.put({
        id: LAST_PROCESSED_MENTION_ID,
        mentionId: lastMentionId.toString()
    });
}

module.exports = {
    getLastProcessedMentionId,
    saveLastProcessedMentionId
}