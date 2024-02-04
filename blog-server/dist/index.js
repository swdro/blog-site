"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const env = dotenv_1.default.config({ path: '../.env' });
// middleware
const authMiddleware_1 = __importDefault(require("./middleware/authMiddleware"));
// routes
const post_1 = __importDefault(require("./routes/post"));
const tags_1 = __importDefault(require("./routes/tags"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = (0, express_1.default)();
// init variables
const DEV = process.env.NODE_ENV !== 'production';
const PORT = DEV ? process.env.SERVER_PORT : 80;
const CLIENT_URL = DEV ? process.env.CLIENT_URL_DEV : 'http://localhost:80';
const REACT_APP_PATH = console.log(DEV);
console.log(CLIENT_URL);
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: CLIENT_URL,
    exposedHeaders: "set-cookie",
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(authMiddleware_1.default);
app.use(post_1.default);
app.use(tags_1.default);
app.use(auth_1.default);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../', 'blog-client/dist/index.html'));
});
app.get('/', (req, res) => {
    res.send("hello world");
});
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
