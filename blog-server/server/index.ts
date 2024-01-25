import express from 'express';
import dotenv from 'dotenv';

// routes
import postRouter from './routes/post';

const app = express();

// init variables
const env = dotenv.config({ path: '../.env' });
const PORT = process.env.SERVER_PORT;

app.use(postRouter);

app.get('/', (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});