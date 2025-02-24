import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    const result = await cloudinary.uploader.upload(file, {
      // upload_preset: "dev_setups",
      resource_type: "auto",
    });

    console.log("This is the result url", result.secure_url);
    fs.unlinkSync(file);
    return result;
  } catch (error) {
    fs.unlinkSync(file);
    return null;
  }
};

export { config, uploadOnCloudinary };
