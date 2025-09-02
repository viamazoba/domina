import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        const whitelist = [
            process.env.FRONTED_URL,
            'http://localhost:3000',
        ];

        if (process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        if (process.argv.includes('--api')) {
            return callback(null, true);
        }

        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS bloqueado para origen: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};