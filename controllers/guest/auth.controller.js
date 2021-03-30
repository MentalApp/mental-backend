const jwt = require('jsonwebtoken');
const appSetting = require('../../appconfig/app.config');
const db = require("../../database/models");
const Test = db.Test;

const authController = {
  joinin: async (req, res) => {
    test = await Test.findOne({ where: { code: req.body.code } })
    console.log(test)
    if (!test) {
      res.status(404).json({ message: 'The test not found' });
    } else if (test) {
      token = jwt.sign({ 
        code: test.code,
        testVersion: test.testVersionId,
        id: test.id,
        role: "guest"
      }, appSetting.jwtConfig.secretKey)

      return res.json({ 
        success: true,
        token: token 
      });
    }
  }
}

module.exports = authController;
