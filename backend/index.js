const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true, limit: "5mb"}));
app.use(express.json({limit: "5mb"}))
const MONGO_URI =
  "mongodb+srv://adeboysina:geYzZzKe6bTCfnVI@node-september.p0ryrox.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB has connected Successfully");
  })
  .catch((err) => {
    console.log({message: "There was an error connecting to the Database", err});
  });

app.get("/", (req, res) => {
  res.send("We are live");
});
app.post("/xxx",(req,res)=>{
    console.log(req.body)
})
const PORT = 8050;
const userRouter = require("./routes/user.routes");
app.use("/users", userRouter);

const accountRouter = require("./routes/account.route")
app.use("/account", accountRouter)


app.listen(PORT, () => {
  console.log("App Started @ PORT:" + PORT);
});
