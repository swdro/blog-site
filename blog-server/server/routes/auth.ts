import express from 'express';
import { authLogin } from '../controllers/auth/authLoginController';

const router = express.Router();

router.post('/login', authLogin);

export default router;