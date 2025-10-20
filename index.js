const express = require("express");
const userRouter = require("./src/routes/user");
const notesRouter = require("./src/routes/notes");
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "https://note-frontend-37dy.onrender.com",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  }),
);

app.options("*", cors());
app.use(express.json());

app.use("/api", userRouter);
app.use("/api/notes", notesRouter);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server listen");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
