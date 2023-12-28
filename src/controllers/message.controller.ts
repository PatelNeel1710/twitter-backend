import { AuthenticatedRequest } from "../middleware/auth-middleware";
import messageService from "../service/message.service";

export class MessageController {
    sendMessage = async (req: AuthenticatedRequest, res: any) => {
        const { text } = req.body as any;
        console.log(req.user);
        const userId = req.user?.userId;
        const newMessage = await messageService.sendMessage({ user: userId, text });
        return res.status(201).json({
            message: 'Message has been posted successfully',
            newMessage,
        });
    }
}