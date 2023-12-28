import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import errorHandlerAsync from '../utils/error-handler';
import AppError from '../utils/app-error';

export interface AuthenticatedRequest extends Request {
    user?: { userId: string };
}

const authMiddleware = errorHandlerAsync(async (req: any, res: any, next: any) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('you are not logged in! please login to get access', 401));
    }

    const decode = jwt.decode(token) as any;
    const user = await User.findById(decode.id);

    if (!user) return next(new AppError('user has been deleted', 400));

    req.user = user;
    req.user.userId = user._id;
    next();
});

export default authMiddleware;