const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const fundAccount = async (req, res) => {
  try {
    const { amount } = req.body;
    const token = req.headers.authorization;
    console.log(token);
    const { email } = await jwt.verify(token, "CLASS_SEPTEMBER_2023");
    const user = await userModel.findOne({ email });
    // //find who owns this email
    if (!user) {
      res.send({ message: "User does not exist " });
      return;
    }
    const newAccountBalance = user.accountBalance + Number(amount);
    const update = await userModel.findByIdAndUpdate(user._id, {
      accountBalance: newAccountBalance,
    });
    res.send({ message: "account updated successfully", update });
  } catch (err) {
    res.send({ message: "There was an error", err });
  }
};

module.exports = { fundAccount };
