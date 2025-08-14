import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import trackItem from './api/routes/tracking/track.js'
import upload from './api/routes/tracking/upload.js'

const app = express();


const frontendURL = process.env.FRONTEND_URL_A;
const allowedOrigins = [
    frontendURL,
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true); // Allow requests with no origin (e.g., mobile apps)
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/track', trackItem)
app.use('/upload', upload)

app.listen(3000, () => {
  console.log('Server running on port 3000');
});