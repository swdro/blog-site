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
exports.postBlogpostController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const post_1 = require("../../model/post");
function postBlogpostController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // make sure data was uploaded successfully
            if (!req.body) {
                res.status(422).send('metadata data not sent');
                return;
            }
            if (!req.file) {
                res.status(422).send('file failed to upload');
                return;
            }
            // initialize variables
            const file = req.file;
            const filename = file.originalname;
            const fileBuffer = file.buffer;
            const formData = req.body;
            const createdDate = new Date(formData.createdDate);
            const tagsData = JSON.parse(formData.tagsData);
            console.log(formData);
            console.log(filename);
            console.log(createdDate);
            console.log(tagsData);
            // insert post data into db
            const postId = yield (0, post_1.createPost)(filename, createdDate);
            console.log("postId: ", postId);
            // insert post/tag relationships
            yield (0, post_1.createPostTags)(tagsData, postId);
            console.log("tags created for post");
            // create directory with uuid as directory name 
            const directoryPath = path_1.default.join(__dirname, '../../../blogposts', postId);
            if (!fs_1.default.existsSync(directoryPath)) {
                fs_1.default.mkdirSync(directoryPath);
            }
            // create markdown file in blog post directory
            const newBlogPostPath = path_1.default.join(directoryPath, filename);
            fs_1.default.writeFileSync(newBlogPostPath, '');
            console.log(newBlogPostPath);
            // create write stream and write buffer data to that stream. 
            let fstream = fs_1.default.createWriteStream(newBlogPostPath);
            fstream.write(fileBuffer);
            fstream.on('close', function () {
                res.send('success');
            });
            res.send('success');
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                error: "failed to create post"
            });
        }
    });
}
exports.postBlogpostController = postBlogpostController;
