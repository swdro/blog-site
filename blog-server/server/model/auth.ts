import pool from './index';

export async function loginUser(username: string) {
    try {
        console.log(username);
        const loginUser = await pool.query(
            "SELECT * FROM users WHERE LOWER(username)=LOWER($1)",
            [username]
        );
        return loginUser;
    } catch(e) {
        console.log("error finding user in database");
        throw e;
    }
}
