const { Schema, model } = require("mongoose");

const userImageSchema = new Schema(
  {
    imageId: {
      type: mongoose.Schema.types.ObjectId,
      ref: "Image",
      required: true,
    },
    userId: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserImageModel = model("userImage", userImageSchema);

module.exports = UserImageModel;
