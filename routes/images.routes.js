// This Route can post an image
// can get random image
// can find image by id

const router = require("express").Router();
const imageModel = require("../models/Image.model");

//Post an image / create
router.post("/create", async (req, res, next) => {
  console.log("req.body");
  imageModel
    .create({
      photo_id: req.body.photo_id,
      photo_url: req.body.photo_url,
      photo_image_url: req.body.photo_image_url,
      photo_submitted_at: req.body.photo_submitted_at,
      photo_featured: req.body.photo_featured,
      photo_width: req.body.photo_width,
      photo_height: req.body.photo_height,
      photo_aspect_ratio: req.body.photo_aspect_ratio,
      photo_description: req.body.photo_description,
      photographer_username: req.body.photographer_username,
      photographer_first_name: req.body.photographer_first_name,
      photographer_last_name: req.body.photographer_last_name,
      exif_camera_make: req.body.exif_camera_make,
      exif_camera_model: req.body.exif_camera_model,
      exif_iso: req.body.exif_iso,
      exif_aperture_value: req.body.exif_aperture_value,
      exif_focal_length: req.body.exif_focal_length,
      exif_exposure_time: req.body.exif_exposure_time,
      photo_location_name: req.body.photo_location_name,
      photo_location_latitude: req.body.photo_location_latitude,
      photo_location_longitude: req.body.photo_location_longitude,
      photo_location_country: req.body.photo_location_country,
      photo_location_city: req.body.photo_location_city,
      stats_views: req.body.stats_views,
      stats_downloads: req.body.stats_downloads,
      ai_description: req.body.ai_description,
      ai_primary_landmark_name: req.body.ai_primary_landmark_name,
      ai_primary_landmark_latitude: req.body.ai_primary_landmark_latitude,
      ai_primary_landmark_longitude: req.body.ai_primary_landmark_longitude,
      ai_primary_landmark_confidence: req.body.ai_primary_landmark_confidence,
      blur_hash: req.body.blur_hash,
      colors: req.body.colors,
      keywords: req.body.keywords,
      comments: req.body.comments,
      userImage: req.body.collection,
    })
    .then((newImage) => {
      res.status(200).json(newImage);
      console.log("New Image was created", newImage);
    })
    .catch((err) => next(err));
});

//get random image
//DO ASYNC ROUTE
router.get("/random", (req, res, next) => {
  console.log(req.body);
  imageModel
    .aggregate([{ $sample: { size: 1 } }]) //fetches a random image
    .then((randomImage) => {
      if (randomImage.length > 0) {
        res.status(200).json(randomImage[0]);
        console.log("Random image was retrieved", randomImage[0]);
      } else {
        res.status(404).json({ message: "No images were found" });
      }
    })
    .catch((err) => next(err));
});

// });

//find one image
router.get("/:id", (req, res) => {
  console.log(req.body);
  imageModel.findById(req.params.id).then((oneImage) => {
    res.status(200).json(oneImage);
    console.log("One image was retrieved", oneImage);
  });
});

// We might need find by id and update / delete  to accomplish our bonus

module.exports = router;
