import { Request, Response } from 'express';
import { getPosts } from '../../model/post';

export async function getPostsController(req: Request, res: Response) {
    try {
        // make sure data was uploaded successfully
        const pageData = req.query;

        if (!pageData.limit || !pageData.page) {
            res.status(422).send('limit and page parameters not sent');
            return;
        }


        const limit = parseInt(String(pageData.limit));
        const page = parseInt(String(pageData.page));
        console.log(limit, page);
        const posts = await getPosts(limit, page);
        console.log(posts);
        res.send(posts);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "failed to retrieve posts"
        });
    }
}