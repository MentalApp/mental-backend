const testPoolSerializer = require("./test_pool.serializer");
const dateHelper = require('../helpers/date.helper');

const testSerializer = {
  new: (test, questions) => {
    return ({
      id: test.id,
      testVersionId: test.testVersionId,
      questions: questions ? questions.map(question => testPoolSerializer.new(question)) : JSON.parse(test.questionIds),
      code: test.code,
      name: test.name,
      timer: test.timer,
      isClose: test.isClose,
      description: test.description,
      startDate: dateHelper.formatDateTimeToString(test.startDate),
      endDate: dateHelper.formatDateTimeToString(test.endDate)
    })
  }
};

module.exports = testSerializer;
