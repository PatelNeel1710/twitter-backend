import { AuthenticatedRequest } from "../middleware/auth-middleware";
import followService from "../service/follow.service";

export class FollowController {
    saveFollow = async (req: AuthenticatedRequest, res: any) => {
        const { userToFollow } = req.body as any;
        const userId = req.user?.userId;
        if (userId == userToFollow) return res.status(409).json({ error: 'You cannot follow yourself' });
        const newMessage = await followService.saveFollow({ userId, follows: userToFollow });
        return res.status(201).json({
            message: 'User followed successfully',
            newMessage,
        });
    }
}