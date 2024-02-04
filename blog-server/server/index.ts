import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
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
const PORT = DEV ? process.env.SERVER_PORT : 80;
const CLIENT_URL = process.env.CLIENT_URL_DEV;
const REACT_APP_PATH = String(process.env.REACT_DIST_PATH);
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

console.log(REACT_APP_PATH);
console.log(path.join(REACT_APP_PATH, 'index.html'))
// serve react file
app.use(express.static(path.join(__dirname, REACT_APP_PATH)));
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, REACT_APP_PATH, 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});