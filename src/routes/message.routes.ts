import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

router.post('/post', authMiddleware, new MessageController().sendMessage);

export default router;