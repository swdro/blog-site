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
exports.getPost = exports.getPosts = exports.createPostTags = exports.createPost = void 0;
const index_1 = __importDefault(require("./index"));
function createPost(title, createdDate) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createPost = yield index_1.default.query("INSERT INTO posts (title, created_dt) values ($1, $2) RETURNING *", [title, createdDate]);
            const postId = createPost.rows[0].id;
            return postId;
        }
        catch (e) {
            console.log("failed to create post in database...");
            throw e;
        }
    });
}
exports.createPost = createPost;
function createPostTags(tags, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const tagId of tags) {
                const createPostTags = yield index_1.default.query("INSERT INTO post_tags (tag_id, post_id) values ($1, $2) RETURNING *", [tagId, postId]);
            }
        }
        catch (e) {
            console.log("failed to create post in database...");
            throw e;
        }
    });
}
exports.createPostTags = createPostTags;
function getPosts(limit, page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const offset = limit * (page - 1);
            const getPosts = yield index_1.default.query("SELECT * FROM posts ORDER BY created_dt DESC LIMIT $1 OFFSET $2", [limit, offset]);
            const posts = getPosts.rows;
            return posts;
        }
        catch (e) {
            console.log("failed to get posts...");
            throw e;
        }
    });
}
exports.getPosts = getPosts;
function getPost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getPost = yield index_1.default.query("SELECT * FROM posts WHERE id = $1 ", [postId]);
            const post = getPost.rows[0];
            return post;
        }
        catch (e) {
            console.log("failed to get posts...");
            throw e;
        }
    });
}
exports.getPost = getPost;
