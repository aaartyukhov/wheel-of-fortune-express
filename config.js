require('dotenv').config();

const { DB_ADDRESS = 'mongodb://localhost:27017/alfa-wheel', PORT = 3000 } = process.env;

module.exports = {
  DB_ADDRESS,
  PORT,
};
