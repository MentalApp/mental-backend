const appConfig = require('../appconfig/app.config');
const rabbitMQ = require('amqplib');
//Add config consumer and function handler in here
const consummers = require('./consumer.config.json').consumers;
const consumerHandlers = require('./consumer.handler');


const init = async () => {
  try {
    const connection = await rabbitMQ.connect(appConfig.rabbitMQConfig.url);

    if (connection) {
      if (Array.isArray(consummers) && consummers.some(x => x)) {

        const handlerJob = async (queueName, handlerFunction) => {
          if (typeof consumerHandlers[handlerFunction] === 'function' && queueName) {
            const chanel = await connection.createChannel();
            const queueInstance = await chanel.assertQueue(queueName);
            //TODO => check message count in here
            
            chanel.consume(queueName, consumerHandlers[handlerFunction], {
              noAck: true
            });
            return true;
          } else {
            return false;
          }
        }

        let task = [];
        consummers.forEach((item, index) => {
          task.push(handlerJob(item.jobQueue, item.handlerFunction));
        });

        const actionResult = await Promise.all(task);
        if (actionResult.some(x => !x)) {
          console.log(`Have error when init consumer`);
        } else {
          console.log(`Init ${actionResult.length} job success`);
        }

      }
    }
  } catch (error) {
    console.log(`Init consumer fail with error: ${error}`);
  }
}

module.exports = init;