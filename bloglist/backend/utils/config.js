require('dotenv').config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI; //need to config this inside env file

module.exports = {
  MONGODB_URI,
  PORT,
};
