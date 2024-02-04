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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogpostController = void 0;
const post_1 = require("../../model/post");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const tags_1 = require("../../model/tags");
function getBlogpostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const postId = String(req.query.postId);
            console.log("postId: ", postId);
            if (!postId) {
                res.status(422).send('post ID not sent');
                return;
            }
            // get post info and tags from DB
            const post = yield (0, post_1.getPost)(String(postId));
            const { title, created_dt } = post;
            const postTags = yield (0, tags_1.getPostTags)(postId);
            // make sure file path exists
            const filePath = path_1.default.join(__dirname, '../../../blogposts', postId, title);
            if (!fs_1.default.existsSync(filePath)) {
                res.status(500).send('blogs not available');
                return;
            }
            // read and extract text from file 
            const markdownString = fs_1.default.readFileSync(filePath, 'utf-8');
            // construct response object
            const responseObject = {
                title,
                "createdDate": created_dt,
                markdownString,
                postTags
            };
            res.send(responseObject);
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                error: "failed to retrieve post"
            });
        }
    });
}
exports.getBlogpostController = getBlogpostController;
