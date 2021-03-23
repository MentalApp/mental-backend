/**
 * Router in here
 */
const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');
const appSetting = require('../appconfig/app.config');
const authMiddleware = require('../middlewares/auth.middleware');


authRouter.post('/login', authController.login);
authRouter.post('/logout', (req, res) => {
    //TODO => đoạn này xử lý sau
});

authRouter.get('/user', authController.getCurrentUser);

module.exports = authRouter;