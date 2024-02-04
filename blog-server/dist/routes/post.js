"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const postBlogpostController_1 = require("../controllers/post/postBlogpostController");
const getBlogpostsController_1 = require("../controllers/post/getBlogpostsController");
const getBlogpostController_1 = require("../controllers/post/getBlogpostController");
const router = express_1.default.Router();
//router.post('/post', connectBusboy(), postController);
//router.post('/post', express.raw({type: '*/*'}), postController);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post('/post', upload.single('file'), postBlogpostController_1.postBlogpostController);
router.get('/posts', getBlogpostsController_1.getBlogpostsController);
router.get('/post', getBlogpostController_1.getBlogpostController);
exports.default = router;
