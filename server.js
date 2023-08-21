const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter')
const questionRouter = require("./routes/questionRouter");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", authRouter);
app.use("/api/v1/question", questionRouter);

const connect = async () => {
  try{
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");
  } catch(err){
    throw err;
  }
}

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on http://localhost:${PORT}`);
});
