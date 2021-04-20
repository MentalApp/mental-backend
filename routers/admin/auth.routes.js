module.exports = (app) => {
  const express = require('express');
  const router = express.Router();
  const authController = require('../../controllers/admin/auth.controller');

  router.post('/login', authController.login);
  router.post('/logout', (req, res) => {
    //TODO => đoạn này xử lý sau
  });

  router.get('/user', authController.getCurrentUser);

  app.use('/api/admin', router);
};
