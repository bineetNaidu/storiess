import { Router } from 'express';
import multer from 'multer';
import { StoryModel } from '../models/Story';
import { storage } from '../configs/cloudinary';

const r = Router();
const upload = multer({ storage });

r.post('/story', upload.single('image'), async (req, res) => {
  try {
    const { filename, path } = req.file;
    const story = await StoryModel.create({
      image_url: path,
      filename,
      likes: [],
      watched: [],
      user: req.body.user,
    });

    await story.save();

    res.json({ data: story, success: true });
  } catch (err) {
    res.json({
      data: null,
      error: err.message,
      success: false,
    });
  }
});

export default r;
