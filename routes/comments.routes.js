const router = require("express").Router();
const commentModel = require("../models/Comment.model");

//get comments
router.get("/", async (req, res) => {
  const imageId = req.query.image_id;
  try {
    const comments = await commentModel.find({ image_id: imageId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//post comment
router.post("/create", async (req, res) => {
  try {
    const newComment = await commentModel.create(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete comment
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedComment = await commentModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
