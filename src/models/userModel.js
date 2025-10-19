const mongoose = require("mongoose");
var validator = require("validator");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 5,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    fullName: {
      type: String,
      requires: true,
      minLenght: 3,
      maxLength: 30,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Make strong password");
        }
      },
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("user", UserSchema);
