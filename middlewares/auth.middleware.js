const appSetting = require('../appconfig/app.config');
const jwt = require('jsonwebtoken');
const {StatusCodes, getReasonPhrase} = require('http-status-codes');
const {Roles} = require('../helpers/constant');

const authMiddleware = {
  authGuest: async (req, res, next) => {
    try {
      if (req.headers[appSetting.authKey]) {
        const token = req.headers[appSetting.authKey];
        const decode = jwt.verify(token, appSetting.jwtConfig.guestSecretKey);
        if (!!decode) {
          next();
        } else {
          res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
          });
        }
      } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        });
      }
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }
  },
  authAdmin: async (req, res, next) => {
    if (!req.headers[appSetting.authKey]) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);

    if (!decode) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }

    if (!decode.role.includes(Roles.admin)) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }
    next();
  },
  authMidleRole: async (req, res, next) => {
    if (!req.headers[appSetting.authKey]) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
    if (!decode) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: getReasonPhrase(StatusCodes.UNAUTHORIZED),
      });
    }
    next();
  },
};

module.exports = authMiddleware;
