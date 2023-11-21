const userModel = require("../models/user.model");

const fundAccount = async (req, res) => {
  try {
    const { email, amount, password } = req.body;

    //find who owns this email and password
    const user = await userModel.findOne({ email, password });
    if (!user) {
      res.send({ message: "User does not exist " });
      return;
    }
    const newAccountBalance = user.accountBalance + Number(amount);
    // console.log(newAccountBalance);
    const update = await userModel.findByIdAndUpdate(user._id, {
      accountBalance: newAccountBalance,
    });

    res.send({ message: "account updated successfully", update });
  } catch (err) {
    res.send({ message: "There was an error", err });
  }
};

module.exports = { fundAccount };
