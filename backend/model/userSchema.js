const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      maxLength: [50, "Name should be less than 50 characters"],
      minLength: [3, "Name should be at least 3 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email is already registered"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      select: false,
    },
    forgetPasswordToken: {
      type: String,
    },
    forPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// Custom methods
userSchema.methods.jwtToken = function () {
  return JWT.sign({ id: this._id, email: this.email }, process.env.SECRET, {
    expiresIn: "20h",
  });
};

module.exports = mongoose.model("User", userSchema);
