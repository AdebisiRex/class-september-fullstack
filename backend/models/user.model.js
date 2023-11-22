const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, required: true, unique: true },
  password: String,
  userId: { type: Number, unique: true },
  accountBalance: Number,
  createdAt: { type: Date, default: Date.now() },
});

const saltround = 10;
userSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, saltround)
    .then((result) => {
      this.password = result;
      next();
    })
    .catch((err) => {
      throw new Error("Passoword failed");
    });
});

userSchema.methods.validator = function (password, callback) {
  bcrypt
    .compare(password, this.password)
    .then((same) => {
      callback(same);
    })
    .catch((err) => {
      next();
    });
};

const userModel = mongoose.model("atm_users", userSchema);

module.exports = userModel;
