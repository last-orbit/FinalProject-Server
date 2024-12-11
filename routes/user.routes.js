//This route manages User update,
// get informations on a specific user,
// add a friend to the user and get all friends users.

const router = require("express").Router();
const UserModel = require("../models/User.model.js");

//Edit a user
router.put("/update/:userId", async (req, res, next) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "🥳user has been updated", updatedUser });
  } catch (err) {
    next(err);
  }
});

//Delete a user
//🚨 DON'T DELETE USER FOR NOW
//SINCE WE NEED TO ALSO DELETE COMMENTS AND COLLECTION OF THE USER
// router.delete("/delete/:userId", async (req, res, next) => {
//   try {
//     const deletedUser = await UserModel.findByIdAndDelete(req.params.userId);
//     res.status(200).json({ message: "🥳 user deleted" });
//   } catch (error) {
//     next(err);
//   }
// });

//Add a friend to a specific user
router.put("/togetheritsbetter/:userId/:friendId", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const friend = await UserModel.findById(req.params.friendId);
    //check if the user and the friend exist in the user db
    if (!user || !friend) {
      return res.status(404).json({ message: "🤦User or friend not found" });
    }
    //check if the friend already exist in the friends list of the current user
    if (user.friends.includes(friend._id)) {
      return res.status(409).json({ message: "⛔️Friend already added" });
    }

    user.friends.push(friend._id);
    await user.save();

    res
      .status(200)
      .json({ message: "🥳Friend added successfully", updatedUser: user });
  } catch (err) {
    next(err);
  }
});

//Delete a friend to a specific user
router.delete(
  "/togetheritsbetter/:userId/:friendId",
  async (req, res, next) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const friend = await UserModel.findById(req.params.friendId);

      //check if the user and the friend exist in the user db
      if (!user || !friend) {
        return res.status(404).json({ message: "🤦User or friend not found" });
      }

      //check if the firend does exist in the friends list of the current user
      if (!user.friends.includes(friend._id)) {
        return res
          .status(418)
          .json({ message: "🤷‍♂️Friend not found in user's friends list" });
      }
      const friendIndex = user.friends.indexOf(friend._id);
      user.friends.splice(friendIndex, 1);
      await user.save();

      res
        .status(200)
        .json({ message: "🥳Friend removed successfully", updatedUser: user });
    } catch (err) {
      next(err);
    }
  }
);

//Get all friends
router.get("/allFriends/:userId", async (req, res, next) => {
  try {
    const friends = await UserModel.findById(req.params.userId).populate(
      "friends"
    );
    res.status(200).json({ message: "🥳 all friends found", friends });
  } catch (err) {
    next(err);
  }
});

//Get user informations
router.get("/:userId", async (req, res, next) => {
  try {
    const oneUser = await UserModel.findById(req.params.userId);
    res.status(200).json({ message: "🥳User found", oneUser });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
