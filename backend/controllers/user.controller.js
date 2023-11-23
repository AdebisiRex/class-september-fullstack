const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

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

const loginUser = async (req, res) => {
  try {
    const { email, amount, password } = req.body;

    //find who owns this email
    const user = await userModel.findOne({ email });
    if (!user) {
      res.send({ message: "User does not exist " });
      return;
    }
    user.validator(password, async (same) => {
      if (same) {
        const token = jwt.sign({email: user.email}, "CLASS_SEPTEMBER_2023");
        console.log(token);
        res.send({ status: true, message: "Login Success ", user, token });
      } else {
        res.send({ message: "Invalid Credentials", status: "false" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
