const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  var privateKey = process.env.JWT_SECRET;
  var token = jwt.sign({ id : id }, privateKey);
  return token
};


module.exports = generateToken;