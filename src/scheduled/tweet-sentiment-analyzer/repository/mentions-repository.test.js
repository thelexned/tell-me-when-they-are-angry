const mentionsRepository = require("../../../../src/scheduled/tweet-sentiment-analyzer/repository/mentions-repository");
const arc = require('@architect/functions');

describe("MentionsRepository", () => {
    describe("#saveLastProcessedMentionId", () => {
        test("saves last processed mention id", async () => {
            const mentionId = 123;
            const put = jest.fn(() => Promise.resolve());
            const tablesMock = jest.spyOn(arc, 'tables')
                .mockImplementation(() => Promise.resolve({
                    mentions: {put}
                }));

            await mentionsRepository.saveLastProcessedMentionId(mentionId);

            expect(put).toHaveBeenCalledWith({
                mentionId: mentionId.toString()
            });
            tablesMock.mockRestore();
        });
    });

    describe("#getLastProcessedMentionId", () => {
        test("gets the last processed mention id", async () => {
            const mentionId = 123;
            const scan = jest.fn(() => Promise.resolve(
                {Items: [{mentionId: mentionId}]}));
            const tablesMock = jest.spyOn(arc, 'tables')
                .mockImplementation(() => Promise.resolve({
                    mentions: {scan}
                }));

            const lastProcessedMentionId = await mentionsRepository.getLastProcessedMentionId();

            expect(lastProcessedMentionId).toEqual(mentionId);
            expect(scan).toHaveBeenCalledWith({});
            tablesMock.mockRestore();
        });

        test("returns zero given no items exist in db", async () => {
            const scan = jest.fn(() => Promise.resolve(
                {Items: []}));
            const tablesMock = jest.spyOn(arc, 'tables')
                .mockImplementation(() => Promise.resolve({
                    mentions: {scan}
                }));

            const lastProcessedMentionId = await mentionsRepository.getLastProcessedMentionId();

            expect(lastProcessedMentionId).toEqual(0);
            expect(scan).toHaveBeenCalledWith({});
            tablesMock.mockRestore();
        });
    });
});
