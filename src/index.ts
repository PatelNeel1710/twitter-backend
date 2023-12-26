import mongoose from 'mongoose';
import { PORT, DB_URL } from './config/config';
import app from './app';

mongoose
    .connect(DB_URL, { dbName: 'twitter' })
    .then(() => {
        console.log('DB connection successful');
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });

app
    .listen(PORT, () => {
        console.log(`App listening on ${PORT}`);
    })
    .on('error', (err) => {
        console.log('err: ', err);
    });