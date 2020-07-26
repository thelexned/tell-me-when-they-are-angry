const mentionsRepository = require("./mentions-repository");
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
                id: 1,
                mentionId: mentionId.toString()
            });
            tablesMock.mockRestore();
        });
    });

    describe("#getLastProcessedMentionId", () => {
        test("gets the last processed mention id", async () => {
            const mentionId = 123;
            const query = jest.fn(() => Promise.resolve(
                {Items: [{id: 1, mentionId: mentionId}]}));
            const tablesMock = jest.spyOn(arc, 'tables')
                .mockImplementation(() => Promise.resolve({
                    mentions: {query}
                }));

            const lastProcessedMentionId = await mentionsRepository.getLastProcessedMentionId();

            expect(lastProcessedMentionId).toEqual(mentionId);
            expect(query).toHaveBeenCalledWith({"key_condition_expression": "id = 1"});
            tablesMock.mockRestore();
        });

        test("returns zero given no items exist in db", async () => {
            const query = jest.fn(() => Promise.resolve(
                {Items: []}));
            const tablesMock = jest.spyOn(arc, 'tables')
                .mockImplementation(() => Promise.resolve({
                    mentions: {query}
                }));

            const lastProcessedMentionId = await mentionsRepository.getLastProcessedMentionId();

            expect(lastProcessedMentionId).toEqual(0);
            expect(query).toHaveBeenCalledWith({"key_condition_expression": "id = 1"});
            tablesMock.mockRestore();
        });
    });
});