/* eslint-disable no-underscore-dangle */
import fs from "file-system";
import Image from "../models/image.model.js";

const create = async (req, res, next) => {
  const fileName = req.file.originalname;
  const imageId = fileName.split("-")[0];
  const fileSizeLimit = 1024 * 1024 * 10;

  if (!req.file) {
    return res.send({ error: "You forgot to upload file" });
  }

  const image = new Image({
    image: req.file.originalname,
    imageUrl: `http://localhost:5000/images/${req.file.originalname}`,
  });

  if (req.file.size > fileSizeLimit) {
    fs.fs.unlinkSync(`./${req.file.path}`);
    return res.send({ Error: "Allowed size of image is 10MB" });
  }
  if (
    req.file.mimetype.includes("image/jpeg") ||
    req.file.mimetype.includes("image/png")
  ) {
    image.save((err, result) => {
      if (err) {
        return res.send({ error: "error" });
      }

      fs.fs.readdirSync("./images").map((item) => {
        if (item !== fileName && item.includes(imageId)) {
          fs.fs.unlinkSync(`./images/${item}`);
        }
      });

      return res.send({
        message: "Image uploaded successfully",
        imageUrl: `/images/${fileName}`,
      });
    });
  } else {
    fs.fs.unlinkSync(`./${req.file.path}`);
    return res.send({ error: "Format of the file must be PNG | JPEG | JPG" });
  }
};

export default {
  create,
};
