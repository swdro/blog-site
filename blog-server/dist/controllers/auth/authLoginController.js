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
exports.authLogin = void 0;
const auth_1 = require("../../model/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AuthCookieConfig = {
    //name: "Auth",
    maxAge: 30 * 24 * 3600000, // 30 * 24 hours
    httpOnly: true,
    sameSite: "lax",
    secure: false,
};
function authLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(422).send('username or password not sent');
            return;
        }
        console.log(username, password);
        // validate login
        try {
            const loginUserQuery = yield (0, auth_1.loginUser)(username);
            // check if username exists in DB
            if (loginUserQuery.rowCount === 0) {
                console.log("user not found in database");
                res.status(401).send('invalid user or password');
                return;
            }
            // used to generate password and insert into db manually
            //const hashedPassword = await bcrypt.hash(password, 10);
            //console.log(hashedPassword);
            const userData = loginUserQuery.rows[0];
            // check if password matches
            if (!(yield bcrypt_1.default.compare(password, userData.password))) {
                console.log("invalid user or password");
                res.status(401).send('invalid user or password');
                return;
            }
            console.log("user id: ", userData.user_id);
            res.cookie('session', userData.user_id, AuthCookieConfig);
            res.status(200).send('success');
        }
        catch (e) {
            console.log(e);
            res.status(500).send({
                error: "login failed"
            });
        }
    });
}
exports.authLogin = authLogin;
