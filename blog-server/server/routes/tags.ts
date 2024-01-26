import express from 'express';
import { getTagsController } from '../controllers/tags/getTagsController';

const router = express.Router();

router.get('/tags', getTagsController);

export default router;