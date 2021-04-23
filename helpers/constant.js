module.exports = {
  DefaultPaging: {
    page: 1,
    perPage: 20,
  },
  Roles: {
    admin: 'admin',
    doctor: 'doctor',
  },
  Sex: {
    Men: {lable: 'Men', value: 1},
    Women: {lable: 'Woman', value: 2},
  },
  BlockStatus: {
    true: {lable: 'True', value: 1},
    false: {lable: 'False', value: 2},
  },
  ErrorMessage: {
    INFORMATION_USER_IS_NOT_ENOUGH: 'User information is not enough.',
    USERNAME_AND_PASSWORD_IS_REQUIRE: 'Username and password is require.',
    USER_NOT_FOUND: 'Authentication failed. User not found.',
    USER_IS_BLOCKING: 'Authentication failed. User is blocking.',
    WRONG_PASSWORD: 'Authentication failed. Wrong password.',
    TOKEN_IS_INVALID: 'Token is invalid',
    USER_IS_EXISTED: 'User is existed.',
    MILITARYCODE_IS_EXISTED: 'Military Code is existed.',
    CREATE_USER_IS_NOT_SUCCESS: 'Create user is not success.',
    USERS_IS_NOT_FOUND: 'Users is not found.',
    ID_IS_INVALID: 'Id is invalid.',
    UPDATE_IS_FAILED: 'Update is failed.',
    ACCOUNT_IS_UNAUTHORIZE: 'Account is unauthorize.',
    BAD_REQUEST: 'Bad request.',
    INFORMATIONS_IS_NOT_ENOUGH: 'Informations is not enough.',
    CREATE_PREDICT_IS_NOT_SUCCESS: 'Create predict is not success.',
  },
};
