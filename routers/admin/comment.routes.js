module.exports = (app) => {
  const comments = require('../../controllers/admin/comment.controller.js');
  const {authMidleRole} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.post('/', comments.create);
  router.put('/:id', comments.update);

  app.use('/api/admin/comments', authMidleRole, router);
};
  