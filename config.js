const { PORT_DEFAULT, DB_ADDRESS_DEFAULT } = require('./defaultEnv');

require('dotenv').config();

const { DB_ADDRESS = DB_ADDRESS_DEFAULT, PORT = PORT_DEFAULT } = process.env;

module.exports = {
  DB_ADDRESS,
  PORT,
};
