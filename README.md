# Tell me when they are angry
## Description
Lambda for sending notifications for negative mentions on twitter.
## How it works
The project provisions a lambda that monitors Twitter mentions. The lambda gets triggered every hour. It analyses the sentiment in the mentions, and it sends a notification to the TheyAreAngry SNS topic. When subscribed to this topic, you will receive a list of links to the mentions that convey negative sentiments.  

## How to use it

Clone the project
```
git clone https://github.com/thelexned/tell-me-when-they-are-angry.git
```

Install the Architect CLI and AWS SDK
```
npm install -g @architect/architect
npm install -g aws-sdk
```

Install dependencies
```
npm intall
```

Set your Twitter credentials
```
arc env <env> TWITTER_CONSUMER_KEY <val>
arc env <env> TWITTER_CONSUMER_SECRET <val>
arc env <env> TWITTER_ACCESS_TOKEN_KEY <val>
arc env <env> TWITTER_ACCESS_TOKEN_SECRET <val>

// <env> can be: testing, staging or production
```

Deploy to AWS staging
```
arc deploy
```

or production
```
arc deploy production
```

```

```
