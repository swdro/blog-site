import { Request, Response } from 'express';

export function postController(req: Request, res: Response) {
    res.send("getting post...");
}
