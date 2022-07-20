import multer from "multer";
import express from "express";
import fs from "file-system";
import imageCtrl from "../controllers/user.image.controller.js";

const storageUserImage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.fs.existsSync("./images/")) {
      fs.fs.mkdirSync("./images/", { recursive: true });
    }

    callback(null, "./images/");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  },
});

const uploadUserImage = multer({
  storage: storageUserImage,
});

const router = express.Router();

router
  .route("/uploadImage")
  .post(uploadUserImage.single("userImage"), imageCtrl.create);

export default router;
