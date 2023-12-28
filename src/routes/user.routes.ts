import { Router } from 'express';
import authMiddleware from '../middleware/auth-middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();

export default router;