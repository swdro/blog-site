import { Request, Response } from 'express';
import { getTags } from '../../model/tags';

export async function getTagsController(req: Request, res: Response) {
    try {
        const tags = await getTags();
        res.send(tags);
    } catch (e) {
        console.log(e);
        res.status(500).send({
            error: "failed to get tags"
        });
    }
}