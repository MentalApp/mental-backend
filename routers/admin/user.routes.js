module.exports = app => {
  const users = require("../../controllers/admin/user.controller.js");

  var router = require("express").Router();

  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.delete("/:id", users.delete);
  router.delete("/", users.deleteAll);

  app.use('/api/admin/users', router);
};
