"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INCLUDED_PATHS = ["/post"];
function default_1(req, res, next) {
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
exports.default = default_1;
