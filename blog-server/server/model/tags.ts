import pool from './index';

export async function getTags() {
    try {
        const getTags = await pool.query(
            "SELECT * FROM tags"
        );
        const tags = getTags.rows;
        return tags;
    } catch(e) {
        console.log("failed to get tags from database...");
        throw e;
    }
}
