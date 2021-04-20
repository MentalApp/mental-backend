module.exports = {
  handlerErrorAPI: (res, serviceResult, error) => {
    serviceResult.code = 500;
    serviceResult.error = error.message;
  },
};
