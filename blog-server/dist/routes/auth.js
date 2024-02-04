"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authLoginController_1 = require("../controllers/auth/authLoginController");
const router = express_1.default.Router();
router.post('/login', authLoginController_1.authLogin);
exports.default = router;
