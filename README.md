# Tell me when they are angry
## Description
Lambda for sending notification for negative mentions on twitter

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
