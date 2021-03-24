const jwt = require('jsonwebtoken');
const appSetting = require('../../appconfig/app.config');
const db = require("../../database/models");
const User = db.User;
const Op = db.Sequelize.Op;

const authController = {
  login: async (req, res) => {
    //TODO => đoạn này lấy thêm user để check exist
    try {
      if (req.body && req.body.email && req.body.password) {
        const token = jwt.sign({
          user: req.body.email,
          password: req.body.password
        }, appSetting.jwtConfig.secretKey);

        res.cookie(token, {
          httpOnly: true,
          expires: appSetting.cookieConfig.expires,
          signed: true
        });
        res.status(200).json({
          message: "Successed"
        });
      } else {
        throw ("Argument not correct");
      }
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  },
  //TODO
  logout: async (req, res) => {
    try {
        
    } catch (error) {
      res.status(400).message(error);
    }
  },
  getCurrentUser: async (req, res) => {
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
    if (decode) {
        //TODO => lấy user
      const user = await User.findOne({ where: { email: decode.user } });
      res.status(200).json({
        message: user
      });
    }
  }
}

module.exports = authController;
