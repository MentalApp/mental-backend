const consumerHandlers = {
  saveAnswer: async (message) => {
    //TODO => handler save answer in here
    console.log(JSON.parse(message.content));
  }
}

module.exports = consumerHandlers;