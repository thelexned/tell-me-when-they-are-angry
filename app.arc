@app
tell-me-when-they-are-angry

@scheduled
tweet-sentiment-analyzer rate(1 hour)

@tables
mentions
  mentionId *String

@events
they-are-angry