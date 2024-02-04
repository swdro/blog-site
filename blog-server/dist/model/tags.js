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
exports.getTagName = exports.getPostTags = exports.getTags = void 0;
const index_1 = __importDefault(require("./index"));
function getTags() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getTags = yield index_1.default.query("SELECT * FROM tags");
            const tags = getTags.rows;
            return tags;
        }
        catch (e) {
            console.log("failed to get tags from database...");
            throw e;
        }
    });
}
exports.getTags = getTags;
function getPostTags(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getPostTags = yield index_1.default.query("SELECT * FROM post_tags WHERE post_id = $1", [postId]);
            const postTags = getPostTags.rows;
            const tagsData = [];
            for (const { tag_id, post_id } of postTags) {
                const tagName = yield getTagName(tag_id);
                tagsData.push({
                    tagName,
                    tagId: tag_id
                });
            }
            return tagsData;
        }
        catch (e) {
            console.log("failed to get post's tags from database...");
            throw e;
        }
    });
}
exports.getPostTags = getPostTags;
function getTagName(tagId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getTagName = yield index_1.default.query("SELECT * FROM tags WHERE id = $1", [tagId]);
            const tagName = getTagName.rows[0].tag_name;
            return tagName;
        }
        catch (e) {
            console.log("failed to get tags from database...");
            throw e;
        }
    });
}
exports.getTagName = getTagName;
