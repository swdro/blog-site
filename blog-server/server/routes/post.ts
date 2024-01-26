import express from 'express';
import multer from 'multer';
import { postBlogpostController } from '../controllers/post/postBlogpostController';

const router = express.Router();

//router.post('/post', connectBusboy(), postController);
//router.post('/post', express.raw({type: '*/*'}), postController);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/post', upload.single('file'), postBlogpostController);

export default router;