import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const env = dotenv.config({ path: '../.env' });

// routes
import postRouter from './routes/post';
import tagsRouter from './routes/tags';

const app = express();

// init variables
const PORT = process.env.SERVER_PORT;

//app.use(busboy());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(postRouter);
app.use(tagsRouter);

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});