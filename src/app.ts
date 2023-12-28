import express from 'express';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import m2s from 'mongoose-to-swagger';
import User from './models/user.model';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import messageRouter from './routes/message.routes';
import followRouter from './routes/follow.routes';

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Twitter APIs with Swagger',
            version: '0.1.0',
            description: 'This is a nodejs application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            schemas: {
                user: m2s(User),
                // Post: m2s(Post),
                // Comment: m2s(Comment),
            },
        },
    },
    apis: [`${__dirname}/controllers/*.ts`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).json({ message: 'server running' });
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/follow', followRouter);

export default app;
