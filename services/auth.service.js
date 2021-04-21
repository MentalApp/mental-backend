/**
 * Service in here
 */
const appSetting = require('../../appconfig/app.config');

const authService = {
  login: async (req, res) => {
    try {
      if (req.body) {
        if (req.body.userName && req.body.passWord) {

        } else {

        }
      }
    } catch (error) {

    }
  },
  getCurrentUser: (req) => {
    const token = req.headers[appSetting.authKey];
    const decode = jwt.verify(token, appSetting.jwtConfig.secretKey);
    if (decode) {
      return decode;
    }
  }
}