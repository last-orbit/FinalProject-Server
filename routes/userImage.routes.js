//This route handles the relationship betweeen user and image

const router = require("express").Router();

const UserImageModel = require("../models/UserImage.model");
const ImageModel = require("../models/Image.model");
const UserModel = require("../models/User.model");

//Add an image to a user collection
router.post("/addtocollection", async (req, res, next) => {
  const userId = req.body.userId;
  const imageId = req.body.imageId;

  try {
    //checking if the user and the image exist
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "🤦‍♂️ User not found" });
    const image = await ImageModel.findById(imageId);
    if (!image)
      return res.status(404).json({ message: "🤦‍♂️ Image does not exist" });

    //checking if the relationship image/user alreadyu exists
    const doesTheImageIsInUserCollection = await UserImageModel.find({
      userId,
      imageId,
    });
    if (doesTheImageIsInUserCollection.length > 0)
      return res
        .status(200)
        .json({ message: "🚨 image already in collection" });

    const newCollection = await UserImageModel.create({ userId, imageId });
    res.status(200).json({
      message: "🥳image added to users collection",
      data: newCollection,
    });
  } catch (err) {
    next(err);
  }
});
//Remove an image to a user collection
router.delete("/addtocollection", async (req, res, next) => {
  const userId = req.body.userId;
  const imageId = req.body.imageId;

  try {
    //checking if the user and the image exist
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "🤦‍♂️ User not found" });
    const image = await ImageModel.findById(imageId);
    if (!image)
      return res.status(404).json({ message: "🤦‍♂️ Image does not exist" });

    //checking if the relationship image/user alreadyu exists
    const doesTheImageIsInUserCollection = await UserImageModel.find({
      userId,
      imageId,
    });
    if (!doesTheImageIsInUserCollection.length > 0)
      return res.status(200).json({ message: "🚨 image is not in collection" });

    const deletedImage = await UserImageModel.findOneAndDelete({
      userId,
      imageId,
    });
    res.status(200).json({
      message: "🥳image has been delete from users collection",
      data: deletedImage,
    });
  } catch (err) {
    next(err);
  }
});

//Get user's collection
router.get("/:userId", async (req, res) => {
  const userId = req.body.userId;
  try {
    //checking if the user exists
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "🤦‍♂️ User not found" });

    //retrieving all the relationship for the given user
    const userCollection = await UserImageModel.find({ userId });
    if (!userCollection)
      return res.status(200).json({ message: "🤷‍♂️ no image in collection" });
    res
      .status(200)
      .json({ message: "🥳user collection found", userCollection });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
