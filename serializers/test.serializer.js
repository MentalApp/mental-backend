const testPoolSerializer = require("./test_pool.serializer")

const testSerializer = {
  new: (test, questions) => {
    return ({
      id: test.id,
      testVersionId: test.testVersionId,
      questions: questions ? questions.map(question => testPoolSerializer.new(question)) : JSON.parse(test.questionIds),
      code: test.code
    })
  }
};

module.exports = testSerializer;
