
const appConfig = require('../appconfig/app.config');
const rabbitMQ = require('amqplib');

const init = async () => {
  const connection = await rabbitMQ.connect(appConfig.rabbitMQConfig.url);
  connection.setMaxListeners(appConfig.rabbitMQConfig.maxListener);
  return connection;
}

module.exports = (async () => await init())();



