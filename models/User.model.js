const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    image: {
      type: String,
      //
    },
    collections: [
      {
        type: Schema.Types.ObjectId, //might have to change some things for the populate to work
        ref: "Collection",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId, //might have to change some things for the populate to work
        ref: "Comment",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, //might have to change some things for the populate to work
        ref: "User",
      },
    ],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
