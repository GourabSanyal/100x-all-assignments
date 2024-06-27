/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/users');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const PORT = 3000;

const DB_LINK = process.env.DB_LINK;

app.use("/admin", adminRouter)
app.use("/users", userRouter)


// connect to mongoDB
mongoose.connect("mongodb+srv://admin:admin@admin-user-db.cgoa0xw.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("connected", () => {
  console.log("db connected");
});

app.get("/", (req, res) => {
  res.json({ message: "Home route" }); 
});

app.listen(PORT, () => {
  console.log(`Server is listening on port - ${PORT}`);
});
