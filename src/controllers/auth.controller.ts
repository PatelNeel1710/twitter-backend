import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';
import errorHandlerAsync from '../utils/error-handler';
import AppError from '../utils/app-error';
import { HASH_NUMBER, JWT_EXPIRES_IN, JWT_SECRET } from '../config/config';
import User from '../models/user.model';

const signToken = (id: any) =>
    sign({ id }, JWT_SECRET, {
        expiresIn: `${JWT_EXPIRES_IN}`,
    });

const createSendToken = (user: any, statusCode: any, req: any, res: any) => {
    console.log('sending token');
    console.log(`${JWT_EXPIRES_IN}`);
    const token = signToken(user._id);
    res.status(statusCode).json({
        token,
    });
};


/**
 * @swagger
 * tags:
 *   name: user
 *   description: api for user management
 * /api/login:
 *   post:
 *     summery: login api
 *     tags: [user]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: user@123
 *     responses:
 *       200:
 *         description: successful signin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *
 */
export const login = errorHandlerAsync(async (req: { body: { email: any; password?: any; }; }, res: any, next: (arg0: AppError) => void) => {
    console.log('body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('please provide email and password', 400));
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('Could not find the user with given email', 404));
    }
    const pass = await hash(password, HASH_NUMBER);
    console.log('pass:', pass);
    const isCorrect = user.password && await compare(password, user.password);

    console.log('isCorrect:', isCorrect);
    if (isCorrect) {
        createSendToken(user, 200, req, res);
    } else {
        next(new AppError('Please enter correct password', 400));
    }
});
