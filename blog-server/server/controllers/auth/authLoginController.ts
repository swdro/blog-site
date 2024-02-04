import { Request, Response, NextFunction, CookieOptions } from 'express'
import { loginUser } from '../../model/auth';
import bcrypt from 'bcrypt';

const AuthCookieConfig = {
    //name: "Auth",
    maxAge: 30 * 24 * 3600000, // 30 * 24 hours
    httpOnly: true,
    sameSite: "lax",
    secure: false,
};

export async function authLogin(req: Request, res: Response, next: NextFunction) {

    const { username, password } = req.body;
    if (!username|| !password) {
        res.status(422).send('username or password not sent');
        return;
    }

    console.log(username, password);

    // validate login
    try {
        const loginUserQuery = await loginUser(username);
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
        if (!await bcrypt.compare(password, userData.password)) {
            console.log("invalid user or password");
            res.status(401).send('invalid user or password');
            return;
        }
        console.log("user id: ", userData.user_id);
        res.cookie('session', userData.user_id, AuthCookieConfig as CookieOptions);
        res.status(200).send('success');
    } catch(e: any) {
        console.log(e);
        res.status(500).send({
            error: "login failed"
        });
    }
}