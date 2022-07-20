import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
  },
});

export default mongoose.model("Image", ImageSchema);
