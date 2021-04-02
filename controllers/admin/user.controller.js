const db = require("../../database/models");
const userSerializer = require("../../serializers/user.serializer")

const User = db.User;
const Op = db.Sequelize.Op;

const userController = {
  create: async (req, res) => {
    const user = req.body;

    User.create(user)
      .then(data => {
        res.json({
          success: true,
          data: userSerializer.new(data)
        });
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message || "Some error occurred while creating the User."
        });
      });
  },

  findAll: async (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    User.findAll({ where: condition })
      .then(data => {
        res.json({
          success: true,
          data: data.map(item => userSerializer.new(item))
        });
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message || "Some error occurred while retrieving users."
        });
      });
  },

  findOne: async (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
      .then(data => {
        res.json({
          success: true,
          data: userSerializer.new(data)
        });
      })
      .catch(err => {
        res.status(404).json({
          success: false,
          error: err.message || "Error retrieving User with id=" + id
        });
      });
  },

  update: async (req, res) => {
    const id = req.params.id;
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null)

    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.json({
            success: true
          });
        } else {
          res.json({
            success: false
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          error: err.message || "Error updating User with id=" + id
        });
      });
  },

  delete: async (req, res) => {
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.json({
            success: true
          });
        } else {
          res.json({
            success: false
          });
        }
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          error: err.message || "Could not delete User with id=" + id
        });
      });
  }
}

module.exports = userController;
