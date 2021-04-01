module.exports = {
  handlerErrorAPI: (res, serivceResult, error) => {
    res.status(500);
    serivceResult.error = error.message;
  }
}