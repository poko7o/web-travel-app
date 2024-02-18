const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "this field is required",
    },
    // email: {
    //   type: String,
    //   required: "this field is required",
    // },
    comment: {
      type: String,
      required: "this filed is required",
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
