const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    userRole: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    userStatus: {
      type: String,
      enum: ["ACTIVATED", "UNACTIVATED"],
      default: "UNACTIVATED",
    },
  },
  { timestamps: true } // tracking changes in time
);

module.exports = mongoose.model("User", UserSchema);
