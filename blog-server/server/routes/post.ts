import express from 'express';
import { postController } from '../controllers/post/getPostController';

const router = express.Router();

router.get('/post', postController);

export default router;