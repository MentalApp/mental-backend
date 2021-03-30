const testPoolSerializer = {
  new: (testPool) => {
    return ({
      id:             testPool.id,
      question:       testPool.question
    })
  }
};

module.exports = testPoolSerializer;
