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
router.delete("/removefromcollection/", async (req, res, next) => {
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

//check if a relationship between user and image exists
router.get("/isincollection", async (req, res, next) => {
  const userId = req.query.userId;
  const imageId = req.query.imageId;
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

    if (!doesTheImageIsInUserCollection.length > 0) {
      res.status(200).json({
        message: "🚨 image is not in collection",
        isInCollection: false,
      });
    } else {
      res
        .status(200)
        .json({ message: "🥳 image is in collection", isInCollection: true });
    }
  } catch (err) {
    next(err);
  }
});

// create a route of populating and pagination
//Get user's collection
router.get("/:userId", async (req, res, next) => {
  try {
    //dealing with the request
    const userId = req.params.userId;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); // end of the sample we want to display
    const skip = (page - 1) * limit; // beginning of what we want to display

    //checking if the user exists
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "🤦‍♂️ User not found" });

    //retrieving all the relationship for the given user
    const userCollection = await UserImageModel.find({ userId })
      .populate("imageId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    //getting the total images in user's collection
    const totalImages = await UserImageModel.countDocuments({ userId });
    if (userCollection.length === 0)
      return res.status(200).json({ message: "🤷‍♂️ no image in collection" });

    //final response with pagination
    res.status(200).json({
      message: "🥳user collection found",
      images: userCollection, //the array of all the images in the current skip/limit config
      totalImages, //Nb of all images in the collection
      totalPages: Math.ceil(totalImages / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
});

//Get the userImage for all the users except the loggedin user
router.get("/getalluserimages/:userId", async (req, res, next) => {
  try {
    //getting the current userId from request parameters
    const loggedInUserId = req.params.userId;
    //Page and limit for the query
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit); // end of the sample we want to display
    const skip = (page - 1) * limit; // beginning of what we want to display

    //checking if the user exists
    const user = await UserModel.findById(loggedInUserId);
    if (!user) return res.status(404).json({ message: "🤦‍♂️ User not found" });

    //finding all the userImage documents that do not belong to the loggedin user
    const otherUsersImages = await UserImageModel.find({
      userId: { $ne: loggedInUserId },
    })
      .populate("userId")
      .populate("imageId")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    console.log(otherUsersImages);
    res.status(200).json({
      message: "🥳all users images found",
      images: otherUsersImages,
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
});

// router.get("/:userId", async (req, res, next) => {
//   const userId = req.params.userId;
//   try {
//     //checking if the user exists
//     const user = await UserModel.findById(userId);
//     if (!user) return res.status(404).json({ message: "🤦‍♂️ User not found" });

//     //retrieving all the relationship for the given user
//     const userCollection = await UserImageModel.find({ userId }).populate(
//       "imageId"
//     );
//     if (userCollection.length === 0)
//       return res.status(200).json({ message: "🤷‍♂️ no image in collection" });
//     res
//       .status(200)
//       .json({ message: "🥳user collection found", userCollection });
//   } catch (err) {
//     next(err);
//   }
// });


//find users who like the image
router.get('/likes/:imageId', (req, res, next) => {
  try {
    console.log(req);
  const imageId = req.params.id;
  UserModel.find({ likes: imageId }).then((users) => {
    res.status(200).json(users);
    console.log('Users who like the image:', users);
  });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
