module.exports = (app) => {
  const users = require('../../controllers/admin/user.controller.js');
  const {authMidleRole, authAdmin} = require('../../middlewares/auth.middleware');

  var router = require('express').Router();

  router.get('/:id', users.findOne);
  router.put('/:id', users.update);

  app.use('/api/admin/users', authMidleRole, router);
  app.route('/api/admin/users').get(authAdmin, users.findAll).post(authAdmin, users.create);
  app.route('/api/admin/doctors').get(authAdmin, users.indexDoctors);
  app.route('/api/admin/users/:id').delete(authAdmin, users.delete);
  app.route('/api/admin/update_users/:id').put(authAdmin, users.updateWithRoleAdmin);
};
