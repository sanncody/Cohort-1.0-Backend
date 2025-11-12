const conf = require('dotenv');

conf.config();

const _config = {
    port: process.env.PORT,
    mongoDBUri: process.env.MONGODB_URI
};

const config = Object.freeze(_config);

module.exports = config;