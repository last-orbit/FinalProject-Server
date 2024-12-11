const { Schema, model } = require("mongoose");

const userImageSchema = new Schema(
  {
    imageId: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
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
