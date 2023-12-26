import UserService from "../service/user.service";

export class UserController {

    /**
     * @swagger
     * /api/signup:
     *   post:
     *     summery: signup api
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
     *               name:
     *                 type: string
     *                 example: user1
     *     responses:
     *       200:
     *         description: successful signup
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 token:
     *                   type: string
     *
     */
    async createUser(req: any, res: any, next: any) {
        try {
            const { email, password } = req.body;
            const newUser = await UserService.createUser({ email, password });
            return res.status(200).json({
                message: 'User has been created successfully',
                newUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}