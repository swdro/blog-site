import { Request, Response } from 'express';
import { getPost } from '../../model/post';
import path from 'path';
import fs from 'fs';
import { getPostTags } from '../../model/tags';

export async function getBlogpostController(req: Request, res: Response) {
    try {
        const postId = String(req.query.postId);
        console.log("postId: ", postId)

        if (!postId) {
            res.status(422).send('post ID not sent');
            return;
        }
        
        // get post info and tags from DB
        const post = await getPost(String(postId));
        const { title, created_dt } = post;
        const postTags = await getPostTags(postId);

        // make sure file path exists
        const filePath = path.join(__dirname, '../../../blogposts', postId, title);
        if (!fs.existsSync(filePath)) {
            res.status(500).send('blogs not available');
            return;
        }

        // read and extract text from file 
        const markdownString = fs.readFileSync(filePath, 'utf-8');

        // construct response object
        const responseObject = {
            title,
            "createdDate": created_dt,
            markdownString,
            postTags
        }
        res.send(responseObject);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "failed to retrieve post"
        });
    }
}