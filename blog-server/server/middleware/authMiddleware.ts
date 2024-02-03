import { Request, Response, NextFunction } from "express"

const INCLUDED_PATHS = ["/post"];

export default function(req: Request, res: Response, next: NextFunction) {
    //const fullUrl = `${req.protocol}://${req.hostname}:${3000}${req.url}`;
    if (INCLUDED_PATHS.includes(req.path) && req.method === "POST") {
        console.log(`user with session id ${req.cookies.session} accessing path: ${req.path}`);
        if (!req.cookies.session) {
            res.status(401).send('no credentials');
            return;
        }
    }
    next();
}