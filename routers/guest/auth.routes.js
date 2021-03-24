module.exports = app => {
  const express = require('express');
  const router = express.Router();
  const authController = require('../../controllers/guest/auth.controller');

  router.post('/joinin', authController.joinin);

  app.use('/api/guest', router);
}
