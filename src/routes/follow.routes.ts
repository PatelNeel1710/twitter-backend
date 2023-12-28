import { Router } from 'express';
import authMiddleware from '../middleware/auth-middleware';
import { FollowController } from '../controllers/follow.controller';

const router = Router();

router.post('', authMiddleware, new FollowController().saveFollow);

export default router;