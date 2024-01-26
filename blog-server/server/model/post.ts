import pool from './index';

export async function createPost(title: string, createdDate: Date) {
    try {
        const createPost = await pool.query(
            "INSERT INTO posts (title, created_dt) values ($1, $2) RETURNING *",
            [title, createdDate]
        );
        const postId = createPost.rows[0].id;
        return postId;
    } catch(e) {
        console.log("failed to create post in database...");
        throw e;
    }
}
