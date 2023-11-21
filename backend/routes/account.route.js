const express = require("express")
const { fundAccount } = require("../controllers/account.controller")
const router = express.Router()

router.post("/fund-account", fundAccount)


module.exports = router