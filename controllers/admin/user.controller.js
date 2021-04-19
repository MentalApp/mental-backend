const db = require('../../database/models');
const userSerializer = require('../../serializers/user.serializer');
const {Roles, ErrorMessage} = require('../../helpers/constant');
const {removeVietnameseTones} = require('../../helpers/vietnameseTone.helper');
const {DefaultPaging} = require('../../helpers/constant');
const bcrypt = require('bcrypt-nodejs');

const User = db.User;
const Op = db.Sequelize.Op;

const UserController = {
  create: async (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.fullName || !req.body.militaryCode) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.INFORMATION_USER_IS_NOT_ENOUGH,
      });
    }

    const isExist = await User.findOne({where: {email: req.body.email}});
    const isExistMilitaryCode = await User.findOne({where: {militaryCode: req.body.militaryCode}});

    if (isExist) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.USER_IS_EXISTED,
      });
    }

    if (isExistMilitaryCode) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.MILITARYCODE_IS_EXISTED,
      });
    }

    const user = {
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName,
      militaryCode: req.body.militaryCode,
      isBlock: 2,
      nameWithoutUtf8: removeVietnameseTones(req.body.fullName),
      ...(req.body.role && {role: req.body.role}),
    };

    const save = await User.create(user);
    if (!save) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.CREATE_USER_IS_NOT_SUCCESS,
      });
    }

    res.status(201).json({
      success: true,
      data: userSerializer.new(save),
    });
  },

  findAll: async (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    User.findAll({where: condition})
      .then((data) => {
        res.json({
          success: true,
          data: data.map((item) => userSerializer.new(item)),
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err.message || 'Some error occurred while retrieving users.',
        });
      });
  },

  indexDoctors: async (req, res) => {
    const perPage = +req.query.perPage || DefaultPaging.perPage;
    const page = +req.query.page || DefaultPaging.page;

    const condition = {
      role: 'doctor',
    };

    const {count, rows} = await User.findAndCountAll({
      where: condition,
      order: [['id', 'DESC']],
      limit: perPage,
      offset: perPage * page - perPage,
    });
    if (!rows) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.USERS_IS_NOT_FOUND,
      });
    }
    res.json({
      success: true,
      totalPages: Math.ceil(count / perPage),
      data: rows.map((item) => userSerializer.new(item)),
    });
  },

  findOne: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.ID_IS_INVALID,
      });
    }
    const find = await User.findByPk(req.params.id);

    if (!find) {
      res.status(404).json({
        success: false,
        error: 'Error retrieving User with id=' + req.params.id,
      });
    }

    res.status(200).json({
      success: true,
      data: userSerializer.new(find),
    });
  },

  update: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.ID_IS_INVALID,
      });
    }

    const user = await User.findOne({where: {id: req.params.id}});
    console.log(user);
    if (!user) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.USER_NOT_FOUND,
      });
    }

    if (req.body.isBlock) {
      res.status(401).json({
        success: false,
        error: ErrorMessage.ACCOUNT_IS_UNAUTHORIZE,
      });
    }

    if (req.body.password && !req.body.newPassword) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.BAD_REQUEST,
      });
    }

    if (req.body.password && req.body.newPassword) {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(400).json({
          success: false,
          error: ErrorMessage.BAD_REQUEST,
        });
      }
      req.body.password = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(8), null);
    }
    const save = await User.update(
      {
        ...req.body,
        ...(req.body.fullName && {nameWithoutUtf8: removeVietnameseTones(req.body.fullName)}),
      },
      {
        where: {id: req.params.id},
      },
    );
    if (!save) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.UPDATE_IS_FAILED,
      });
    }

    res.status(200).json({
      success: true,
      data: save,
    });
  },

  updateWithRoleAdmin: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.ID_IS_INVALID,
      });
    }

    const user = await User.findOne({where: {id: req.params.id}});
    if (!user) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.USER_NOT_FOUND,
      });
    }

    if (req.body.password && !req.body.newPassword) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.BAD_REQUEST,
      });
    }

    if (req.body.password && req.body.newPassword) {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(400).json({
          success: false,
          error: ErrorMessage.BAD_REQUEST,
        });
      }
      req.body.password = bcrypt.hashSync(req.body.newPassword, bcrypt.genSaltSync(8), null);
    }

    const save = await User.update(
      {
        ...req.body,
        ...(req.body.fullName && {nameWithoutUtf8: removeVietnameseTones(req.body.fullName)}),
      },
      {
        where: {id: req.params.id},
      },
    );

    if (!save) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.UPDATE_IS_FAILED,
      });
    }

    res.status(200).json({
      success: true,
      data: save,
    });
  },

  delete: async (req, res) => {
    if (!req.params.id) {
      res.status(400).json({
        success: false,
        error: ErrorMessage.ID_IS_INVALID,
      });
    }

    const user = await User.findOne({where: {id: req.params.id}});
    if (!user) {
      res.status(404).json({
        success: false,
        error: ErrorMessage.USER_NOT_FOUND,
      });
    }

    User.destroy({
      where: {id: req.params.id},
    })
      .then((num) => {
        if (num == 1) {
          res.json({
            success: true,
          });
        } else {
          res.json({
            success: false,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          error: err.message || 'Could not delete User with id=' + id,
        });
      });
  },
};

module.exports = UserController;
