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

export async function getPostTags(postId: string) {
    try {
        const getPostTags = await pool.query(
            "SELECT * FROM post_tags WHERE post_id = $1",
            [postId]
        );
        const postTags = getPostTags.rows;

        const tagsData = [];
        for (const {tag_id, post_id}  of postTags) {
            const tagName = await getTagName(tag_id);
            tagsData.push({
                tagName,
                tagId: tag_id 
            })
        }

        return tagsData;
    } catch(e) {
        console.log("failed to get post's tags from database...");
        throw e;
    }
}

export async function getTagName(tagId: string) {
    try {
        const getTagName = await pool.query(
            "SELECT * FROM tags WHERE id = $1",
            [tagId]
        );
        const tagName = getTagName.rows[0].tag_name;
        return tagName;
    } catch(e) {
        console.log("failed to get tags from database...");
        throw e;
    }

}
