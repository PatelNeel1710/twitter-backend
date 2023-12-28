import { AuthenticatedRequest } from "../middleware/auth-middleware";
import messageService from "../service/message.service";

export class MessageController {
    getUserId = (req: AuthenticatedRequest) => {
        return req.user?.userId;
    }

    postMessage = async (req: AuthenticatedRequest, res: any) => {
        const { text } = req.body as any;
        const userId = this.getUserId(req);
        const newMessage = await messageService.postMessage({ user: userId, text });
        return res.status(201).json({
            message: 'Message has been posted successfully',
            newMessage,
        });
    }

    getMyFeed = async (req: AuthenticatedRequest, res: any) => {
        const userId = this.getUserId(req);
        const messages = userId && await messageService.getMyFeed(userId);
        return res.status(201).json({
            message: 'All my feed',
            messages,
        });
    }
}