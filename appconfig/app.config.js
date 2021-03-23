const env = require('dotenv');

const patternPath = `appsetting.${process.env.NODE_ENV}.json`;

module.exports = require(`../${patternPath}`);

