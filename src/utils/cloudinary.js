import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: './src/.env' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file) => {
  console.log("This is the filepath", file);

  try {
    if (!file) {
      console.error("No file provided");
      return null;
    }

    // Ensure the file path is correct
    const filePath = file.path || file;

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    console.log("This is the result URL", result?.url);

    // Optionally delete the file from the local filesystem after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);

    // Optionally delete the file from the local filesystem if the upload fails
    if (file.path && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return null;
  }
};
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("This is the result", result);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary", error);
    return null;
  }
}

export { uploadOnCloudinary,deleteFromCloudinary };