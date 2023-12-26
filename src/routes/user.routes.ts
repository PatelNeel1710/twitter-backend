import { Router } from 'express';
import authMiddleware from '../middleware/auth-middleware';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.post('/user', authMiddleware, new UserController().createUser);

router.post('/sign-up', new UserController().createUser);

export default router;