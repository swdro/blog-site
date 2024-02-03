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

export async function createPostTags(tags: string[], postId: string) {
    try {
        for (const tagId of tags) {
            const createPostTags = await pool.query(
                "INSERT INTO post_tags (tag_id, post_id) values ($1, $2) RETURNING *",
                [tagId, postId]
            );
        }
    } catch(e) {
        console.log("failed to create post in database...");
        throw e;
    }
}

export async function getPosts(limit: number, page: number) {
    try {
        const offset = limit * (page - 1);
        const getPosts = await pool.query(
            "SELECT * FROM posts ORDER BY created_dt DESC LIMIT $1 OFFSET $2",
            [limit, offset]
        );
        const posts = getPosts.rows;
        return posts;
    } catch(e) {
        console.log("failed to get posts...");
        throw e;
    }
}

export async function getPost(postId: string) {
    try {
        const getPost = await pool.query(
            "SELECT * FROM posts WHERE id = $1 ",
            [postId]
        );
        const post = getPost.rows[0];
        return post;
    } catch(e) {
        console.log("failed to get posts...");
        throw e;
    }
}

