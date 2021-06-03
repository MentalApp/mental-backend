const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const resultUtil = require('../../servicehelper/service.result');
const exceptionUtil = require('../../handler_error/exceptionUtil');

const appSetting = require('../../appconfig/app.config');
const db = require('../../database/models');
const {ErrorMessage} = require('../../helpers/constant');
const User = db.User;

const authController = {
  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        success: false,
        error: ErrorMessage.USERNAME_AND_PASSWORD_IS_REQUIRE,
      });
    }
    const user = await User.findOne({where: {email: req.body.email}});
    if (!user) {
      return res.status(404).json({
        success: false,
        error: ErrorMessage.USER_NOT_FOUND,
      });
    }

    if (user.isBlock === 1) {
      return res.status(404).json({
        success: false,
        code: 1001,
        error: ErrorMessage.USER_IS_BLOCKING,
      });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(404).json({
        success: false,
        error: ErrorMessage.WRONG_PASSWORD,
      });
    }
    token = jwt.sign(
      {
        email: user.email,
        name: user.fullName,
        id: user.id,
        role: user.role,
      },
      appSetting.jwtConfig.secretKey,
      {
        expiresIn: appSetting.jwtConfig.expire,
      },
    );

    return res.status(200).json({
      success: true,
      data: {
        token: token,
        id: user.id,
        role: user.role,
        name: user.fullName,
      },
    });
  },

  logout: async (req, res) => {
    try {
    } catch (error) {
      res.status(400).message(error);
    }
  },

  getCurrentUser: async (req, res) => {
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
    if (!decode) {
      return res.status(400).json({
        success: false,
        error: ErrorMessage.TOKEN_IS_INVALID,
      });
    }

    const user = await User.findOne({where: {email: decode.email}});
    return res.status(200).json({
      message: user,
    });
  },
};

module.exports = authController;
