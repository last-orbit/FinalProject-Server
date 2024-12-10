const { Schema, model } = require("mongoose");

const imageSchema = new Schema({
  photo_id: {
    type: String,
    unique: true,
  },
  photo_url: {
    type: String,
    unique: true,
  },
  photo_image_url: {
    type: String,
    unique: true,
    required: true,
  },
  photo_submitted_at: {
    type: String,
  },
  photo_featured: {
    type: String,
  },
  photo_width: {
    type: String,
  },
  photo_height: {
    type: String,
  },
  photo_aspect_ratio: {
    type: String,
  },
  photo_description: {
    type: String,
  },
  photographer_username: {
    type: String,
  },
  photographer_first_name: {
    type: String,
  },
  photographer_last_name: {
    type: String,
  },
  exif_camera_make: {
    type: String,
  },
  exif_camera_model: {
    type: String,
  },
  exif_iso: {
    type: String,
  },
  exif_aperture_value: {
    type: String,
  },
  exif_focal_length: {
    type: String,
  },
  exif_exposure_time: {
    type: String,
  },
  photo_location_name: {
    type: String,
  },
  photo_location_latitude: {
    type: String,
  },
  photo_location_longitude: {
    type: String,
  },
  photo_location_country: {
    type: String,
  },
  photo_location_city: {
    type: String,
  },
  stats_views: {
    type: String,
  },
  stats_downloads: {
    type: String,
  },
  ai_description: {
    type: String,
  },
  ai_primary_landmark_name: {
    type: String,
  },
  ai_primary_landmark_latitude: {
    type: String,
  },
  ai_primary_landmark_longitude: {
    type: String,
  },
  ai_primary_landmark_confidence: {
    type: String,
  },
  blur_hash: {
    type: String,
  },
  colors: [String],
  keywords: [String],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  userImage: [
    {
      type: Schema.Types.ObjectId,
      ref: "UserImage",
    },
  ],
});
const ImageModel = model("Image", imageSchema);

module.exports = ImageModel;
