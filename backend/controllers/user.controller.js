const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: "dcntfpntm",
  api_key: "963429939113368",
  api_secret: "-Vp9g6gGPNox2OJ7EzMPCAAxZqU",
});

const uploadPhoto = async (req, res) => {
  cloudinary.v2.uploader.upload(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) {
      console.log(result);
    }
  );
};

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
        const token = jwt.sign({ email: user.email }, "CLASS_SEPTEMBER_2023");
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

module.exports = { registerUser, loginUser, uploadPhoto };
