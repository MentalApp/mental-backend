module.exports = app => {
  const officerTests = require("../../controllers/guest/officer_test.controller.js");
  const authMiddleware = require('../../middlewares/auth.middleware');

  var router = require("express").Router();

  router.post("/", officerTests.create);
  router.put("/:id", officerTests.update);

  app.use('/api/guest/officer_tests', authMiddleware.authGuest, router);
};
