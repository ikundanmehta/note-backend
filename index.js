const express = require("express");

const app = express();
require("dotenv").config();
app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
