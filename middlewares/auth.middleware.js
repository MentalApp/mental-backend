const appSetting = require('../appconfig/app.config');
const jwt = require('jsonwebtoken');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const authMiddleware = {
  authGuest: async (req, res, next) => {
    if (req.headers[appSetting.authKey]) {
      const token = req.headers[appSetting.authKey];
      const decode = jwt.verify(token, appSetting.jwtConfig.secretKey)
      console.log(decode)
      if (!!decode && decode.role == "guest") {
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
        })
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
      })
    }
  },
  authAdmin: async (req, res, next) => {
    if (req.headers[appSetting.authKey]) {
      const token = req.headers[appSetting.authKey];
      const decode = jwt.verify(token, appSetting.jwtConfig.secretKey)
      if (!!decode && decode.role == "admin") {
        next();
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
        })
      }
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED)
      })
    }
  }
}

module.exports = authMiddleware;
