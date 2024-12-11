//This Comment model is used for all the comments of the app. It also sets a relationship between user and image
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image_id: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const CommentModel = model("Comment", commentSchema);
module.exports = CommentModel;
