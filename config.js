const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { DB_ADDRESS = 'mongodb://localhost:27017/alfa-wheel' } = process.env;

module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
};
