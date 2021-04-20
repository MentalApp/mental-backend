const testPoolSerializer = require('./test_pool.serializer');

const testSerializer = {
  new: (test, questions) => {
    return {
      id: test.id,
      testVersionId: test.testVersionId,
      questions: questions
        ? questions.map((question) => testPoolSerializer.new(question))
        : JSON.parse(test.questionIds),
      code: test.code,
      name: test.name,
      timer: test.timer,
      isClose: test.isClose,
      description: test.description,
      startDate: test.startDate,
      endDate: test.endDate,
    };
  },
};

module.exports = testSerializer;
