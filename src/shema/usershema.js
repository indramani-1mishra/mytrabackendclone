const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: [5, "Firstname must be at least 5 characters long"],
      trim:true
    },
    lastname: {
      type: String,
      required: true,
      minlength: [5, "Lastname must be at least 5 characters long"],
      trim:true
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: [true,"email is already use please enter new email"],
      lowercase: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      trim:true
    },
    phonenumber: {
      type: String, // इसे String रखेंगे ताकि `minlength` और `maxlength` लागू कर सकें
      required: true,
      unique: [true,"phone number is already use please enter new phone number"],
      minlength: [10, "Phone number must be exactly 10 digits"],
      maxlength: [10, "Phone number must be exactly 10 digits"],
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save",async function () {
 // console.log(this);
  const hashpassword = await bcrypt.hash(this.password,10);
  this.password=hashpassword;
})

const User = mongoose.model("User", userSchema);
module.exports = User;
