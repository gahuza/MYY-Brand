import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//         api_key: process.env.CLOUDINARY_API_KEY,
//         api_secret: process.env.CLOUDINARY_API_SECRET,
//       });

// // module.exports = cloudinary.uploader;

const blogImage = async req => {
  try {
    const tmp = req.files.photo.tempFilePath;
    const Result = await uploader.upload(tmp, {
      folder: 'my-brand'
    }, (_, result) => result);
    return Result;
  } catch (error) {
    console.log(error);
  }
};
export default blogImage;
//# sourceMappingURL=imageUpload.js.map