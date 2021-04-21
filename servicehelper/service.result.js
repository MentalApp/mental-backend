const exceptionUtil = require('../handler_error/exceptionUtil');

module.exports = {
  new: () => {
    return {
      data: null,
      success: false
    }
  },
  onSuccess(instance, data) {
    instance.data = data;
    instance.success = true;
  },
  onError(instance, data, message) {
    instance.message = message;
    instance.data = data;
    instance.success = false;
  },
  onException(res, instance, err) {
    exceptionUtil.handlerErrorAPI(res, instance, err);
  }
};