import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

router.get('', authMiddleware, new MessageController().getMyFeed);
router.post('', authMiddleware, new MessageController().postMessage);

export default router;