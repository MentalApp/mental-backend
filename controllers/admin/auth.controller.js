const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt-nodejs");

const appSetting = require('../../appconfig/app.config');
const db = require("../../database/models");
const User = db.User;

const authController = {
  login: async (req, res) => {
    user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      res.status(404).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        token = jwt.sign({ 
          email: user.email, 
          name: user.fullName, 
          id: user.id,
          role: "admin"
        }, appSetting.jwtConfig.secretKey)

        return res.json({ token: token });
      }
    }

  },

  logout: async (req, res) => {
    try {
        
    } catch (error) {
      res.status(400).message(error);
    }
  },

  getCurrentUser: async (req, res) => {
    const token = req.headers[appSetting.authKey];
    try {
      const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
      if (decode) {
        const user = await User.findOne({ where: { email: decode.email } });
        res.status(200).json({
          message: user
        });
      } else {
        res.status(200).json({
          message: "Token fake"
        });
      }
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
}

module.exports = authController;
