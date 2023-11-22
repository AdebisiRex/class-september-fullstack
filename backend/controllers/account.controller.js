const userModel = require("../models/user.model");

const fundAccount = async (req, res) => {
  try {
    const { email, amount, password } = req.body;

    //find who owns this email and password
    const user = await userModel.findOne({ email });
    if (!user) {
      res.send({ message: "User does not exist " });
      return;
    }
    user.validator(password, async (same) => {
      if (same) {
        console.log("Hello  The password you are entering is safe");
        const newAccountBalance = user.accountBalance + Number(amount);
        // console.log(newAccountBalance);
        const update = await userModel.findByIdAndUpdate(user._id, {
          accountBalance: newAccountBalance,
        });

        res.send({ message: "account updated successfully", update });
      } else {
        res.send({message: "Invalid Credentials", status:"false"})
      }
    });

    return;
  } catch (err) {
    res.send({ message: "There was an error", err });
  }
};

module.exports = { fundAccount };
