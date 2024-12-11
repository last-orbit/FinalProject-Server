const router = require("express").Router();
const commentModel = require("../models/Comment.model");

//get comments
router.get("/:imageId", async (req, res, next) => {
  try {
    const comments = await commentModel.find({ image_id: req.params.imageId });
    res.status(200).json({ message: "Here are your comments", comments });
  } catch (error) {
    next(error);
  }
});

//post comment
router.post("/create", async (req, res, next) => {
  try {
    const newComment = await commentModel.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

//delete comment
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const deletedComment = await commentModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "comment has been deleted", deletedComment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
