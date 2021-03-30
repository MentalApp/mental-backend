const env = require('dotenv');

const patternPath = `appsetting.development.json`;

module.exports = require(`../${patternPath}`);

