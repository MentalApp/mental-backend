const appSetting = require('../appconfig/app.config');
const jwt = require('jsonwebtoken');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const authMiddleware = {
  authGuest: async (req, res, next) => {
    try {
      if (req.headers[appSetting.authKey]) {
        const token = req.headers[appSetting.authKey];
        const decode = jwt.verify(token, appSetting.jwtConfig.guestSecretKey)
        if (!!decode) {
          next();
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: getReasonPhrase(StatusCodes.UNAUTHORIZED)
          })
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: getReasonPhrase(StatusCodes.UNAUTHORIZED)
        })
      }
    } catch (error) {
      console.log(error.message);
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED)
      });
    }
  },
  authAdmin: async (req, res, next) => {
    try {
      if (req.headers[appSetting.authKey]) {
        const token = req.headers[appSetting.authKey];
        const decode = jwt.verify(token, appSetting.jwtConfig.secretKey)
        if (!!decode) {
          next();
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: getReasonPhrase(StatusCodes.UNAUTHORIZED)
          })
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: getReasonPhrase(StatusCodes.UNAUTHORIZED)
        })
      }
    } catch (error) {
      console.log(error.message);
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED)
      })
    }
  }
}

module.exports = authMiddleware;
