const db = require("../../database/models");
const OfficerTest = db.OfficerTest;
const appConfig = require('../../appconfig/app.config');
const consumerConfig = require('../../worker/consumer.config.json');
// const Op = db.Sequelize.Op;

const officerTestController = {
  create: async (req, res) => {
    const publisherHelper = await require('../../worker/publisher');
    const chanel = await publisherHelper.createChannel()
    const consumer = consumerConfig.consumers.find(x => x.jobTitle === "saveAnswner");

    const queueName = consumer.jobQueue;
    chanel.assertQueue(queueName);
    chanel.sendToQueue(queueName, Buffer.from(JSON.stringify(req.body.answer)));
    setTimeout(() => {
      chanel.close();
    },500)
    res.json({
      message: JSON.stringify(req.body.answer)
    })
    // const officerTest = req.body;
    // officerTest.answer = JSON.stringify(req.body.answer);
    // OfficerTest.create(officerTest)
    //   .then(data => {
    //     data.answer = JSON.parse(data.answer)
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the User."
    //     });
    //   });
  }
}

module.exports = officerTestController;
