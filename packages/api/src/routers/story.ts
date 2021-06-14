import { Router } from 'express';
import multer from 'multer';
import { StoryModel } from '../models/Story';
import { storage } from '../configs/cloudinary';
import { UserModel } from '../models/User';
// import { UserModel } from '../models/User';

const r = Router();
const upload = multer({ storage });

r.post(
  '/story',
  // async (req, _res, next) => {
  //   const { user } = req.body;
  //   console.log(req.);

  //   const userExist = await UserModel.findById(user);
  //   if (userExist) {
  //     next();
  //   } else {
  //     next("ERROR::> User Doesn't Exist");
  //   }
  // },
  upload.single('image'),
  async (req, res) => {
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

      const user = await UserModel.findById(story.user);
      if (!user) {
        throw new Error('Not Authenticated!. No user was found');
      }
      const value = user.storyLimit!;
      if (value >= 5) {
        throw new Error(
          'You have reached your story limit. Either delete a story or wait for the existing stories to vanish'
        );
      }
      await user.update({ storyLimit: value + 1 });
      await user.save();

      res.json({ data: story, success: true });
    } catch (err) {
      res.json({
        data: null,
        error: err.message,
        success: false,
      });
    }
  }
);

export default r;
