import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { ___prod___ } from '../utils/constants';
if (!___prod___) {
  dotenv.config();
}

if (!process.env.CLOUDINARY_CLOUD_NAME)
  throw new Error('Env(CLOUDINARY_CLOUD_NAME):: Not Found!');
if (!process.env.CLOUDINARY_KEY)
  throw new Error('Env(CLOUDINARY_KEY):: Not Found!');
if (!process.env.CLOUDINARY_SECRET)
  throw new Error('Env(CLOUDINARY_SECRET):: Not Found!');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    // @ts-ignore
    folder: ___prod___ ? 'stories_v2' : 'stories_dev',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

export { cloudinary, storage };
