const userModel = require("../models/user.model");

const registerUser = (req, res) => {
  console.log("----------------------------------");
  console.log(req.body);
};

module.exports = { registerUser };
