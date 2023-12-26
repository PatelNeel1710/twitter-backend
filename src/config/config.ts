import { config } from 'dotenv';

config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || 'twitter_backend';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '90d';
export const DB_URL = process.env.DB_URL || 'mongodb+srv://umesh:WzSAjufDqJBiFK9W@cluster0.bsc6kwj.mongodb.net/?retryWrites=true&w=majority';
export const HASH_NUMBER = 12;