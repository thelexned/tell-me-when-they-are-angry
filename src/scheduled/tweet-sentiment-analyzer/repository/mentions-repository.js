const arc = require('@architect/functions')

async function getLastProcessedMentionId() {
    const tables = await arc.tables();
    const mentionsInTable = await tables.mentions.scan({});
    if (mentionsInTable.Items && mentionsInTable.Items.length > 0) {
        return parseInt(mentionsInTable.Items[mentionsInTable.Items.length - 1].mentionId);
    }

    return 0;
}

async function saveLastProcessedMentionId(lastMentionId) {
    const tables = await arc.tables();
    tables.mentions.put({
        mentionId: lastMentionId.toString()
    });
}

module.exports = {
    getLastProcessedMentionId,
    saveLastProcessedMentionId
}