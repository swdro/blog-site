"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogpostsController = void 0;
const post_1 = require("../../model/post");
function getBlogpostsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const posts = yield (0, post_1.getPosts)(limit, page);
            console.log(posts);
            res.send(posts);
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                error: "failed to retrieve posts"
            });
        }
    });
}
exports.getBlogpostsController = getBlogpostsController;
