const userModel = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const data = req.body;
    const userId = Math.floor(Math.random() * 10e5);
    const accountBalance = 5000;
    const userData = { ...data, userId, accountBalance };
    const form = new userModel(userData);
    const response = await form.save();
    res.send({
      status: true,
      message: "Information saved successfully",
      user: response,
    });
  } catch (err) {
    res.send({ message: "There was an error", err });
  }
};

module.exports = { registerUser };
