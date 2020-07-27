const handler = require('./handler');

exports.handler = async function scheduled () {
  await handler.handle()
}
