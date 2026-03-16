
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
 return jwt.sign({ id: userId, role: user.role }, process.env.JWT_SECRET, {
   expiresIn: "7d"
 });
};

module.exports = generateToken;