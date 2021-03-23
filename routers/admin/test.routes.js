module.exports = app => {
  const tests = require("../../controllers/admin/test.controller.js");
  const authMiddleware = require('../../middlewares/auth.middleware');

  var router = require("express").Router();

  router.post("/test_pools", tests.createTestPool);
  router.get("/test_pools", tests.findAllTestPool);
  router.delete("/test_pools/:id", tests.deleteTestPool);

  router.post("/", tests.createTest);
  router.post("/", tests.findAllTest);
  router.get("/:id", tests.findOneTest);
  router.put("/:id", tests.updateTest);
  router.delete("/:id", tests.deleteTest);

  app.use('/api/admin/tests', authMiddleware.authAdmin, router);
};
