function simplifyTweet(tweet) {
    return {
        id: tweet.id_str,
        createdAt: tweet.created_at,
        text: tweet.text,
        userId: tweet.user.id,
        url: `https://twitter.com/${tweet.user.id}/status/${tweet.id_str}`,
    }
}

module.exports = {
    simplifyTweet
}