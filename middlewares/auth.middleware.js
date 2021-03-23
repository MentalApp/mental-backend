const appSetting = require('../appconfig/app.config');
const jwt = require('jsonwebtoken');
const { StatusCodes, getReasonPhrase } = require('http-status-codes');

const authMiddleware = {
    authGuest: async (req, res, next) => {
        next();
    },
    authAdmin: async (req, res, next) => {
        if (req.header[appSetting.authKey]) {
            const token = req.headers[appSetting.authKey];
            if (jwt.verify(token, appSetting.jwtConfig.secretKey)) {
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