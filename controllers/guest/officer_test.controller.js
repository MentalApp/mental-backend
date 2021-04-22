const db = require('../../database/models');
const officerTestSerializer = require('../../serializers/officer_new_test.serializer.js');
const appSetting = require('../../appconfig/app.config');
const moment = require('moment');
const {removeVietnameseTones} = require('../../helpers/vietnameseTone.helper');
const jwt = require('jsonwebtoken');

const OfficerTest = db.OfficerNewTests;
const Test = db.Test;

const officerTestController = {
  create: async (req, res) => {
    // const publisherHelper = await require('../../worker/publisher');
    // const chanel = await publisherHelper.createChannel()
    // const consumer = consumerConfig.consumers.find(x => x.jobTitle === "saveAnswner");
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.guestSecretKey);
    const id = decode.id;

    const officerTest = req.body;
    officerTest.answer = JSON.stringify(officerTest.answer);
    officerTest.testVersion = id.toString();
    officerTest.nameWithoutTone = removeVietnameseTones(officerTest.name);
    const data = await OfficerTest.create(officerTest);
    const test = await Test.findByPk(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        error: 'Some error occurred while creating the Officer test.',
      });
    }
    return res.status(201).json({
      success: true,
      data: officerTestSerializer.new(data, test),
    });
  },
};

module.exports = officerTestController;
