import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const SECRET = process.env.SECRET || '';

export const CLIENT_ID = process.env.CLIENT_ID || '';

export const CLIENT_SECRET = process.env.CLIENT_SECRET || '';
