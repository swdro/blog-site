import express from 'express';
import connectBusboy from 'connect-busboy';
import multer from 'multer';
import { postController } from '../controllers/post/getPostController';

const router = express.Router();

//router.post('/post', connectBusboy(), postController);
//router.post('/post', express.raw({type: '*/*'}), postController);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/post', upload.single('file'), postController);

export default router;