const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type:String, required: true, unique: true},
    password: String,
    userId:  {type:Number, unique: true},
    accountBalance: Number,
    createdAt: {type:Date, default: Date.now()}
})


const userModel= mongoose.model("atm_users", userSchema)

module.exports = userModel