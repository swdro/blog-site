import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const env = dotenv.config({ path: '../.env' });

// middleware
import authMiddleware from './middleware/authMiddleware';

// routes
import postRouter from './routes/post';
import tagsRouter from './routes/tags';
import authRouter from './routes/auth';

const app = express();

// init variables
const DEV = process.env.NODE_ENV !== 'production';
const PORT = process.env.SERVER_PORT;
const CLIENT_URL = DEV ? process.env.CLIENT_URL_DEV : process.env.VITE_SERVER_URL;
console.log(DEV);
console.log(CLIENT_URL);

app.use(cookieParser());
app.use(cors({ 
    origin: CLIENT_URL,
    exposedHeaders: "set-cookie",
    credentials: true
}));  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(authMiddleware);
app.use(postRouter);
app.use(tagsRouter);
app.use(authRouter);

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});