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
exports.loginUser = void 0;
const index_1 = __importDefault(require("./index"));
function loginUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(username);
            const loginUser = yield index_1.default.query("SELECT * FROM users WHERE LOWER(username)=LOWER($1)", [username]);
            return loginUser;
        }
        catch (e) {
            console.log("error finding user in database");
            throw e;
        }
    });
}
exports.loginUser = loginUser;
