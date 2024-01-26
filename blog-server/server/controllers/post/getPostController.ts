import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { createPost } from '../../model/post';

export async function postController(req: Request, res: Response) {
    // make sure data was uploaded successfully
    if (!req.body) {
        res.send('metadata data not sent');
        return;
    }
    if (!req.file) {
        res.send('file failed to upload');
        return;
    }

    // initialize variables
    const file = req.file!;
    const filename = file.originalname;
    const fileBuffer = file.buffer;
    const formData = req.body;
    const createdDate = new Date(formData.createdDate);

    console.log(formData);
    console.log(filename);
    console.log(createdDate);

    // insert post data into db
    const postId = await createPost(filename, createdDate);
    console.log("postId: ", postId);

    // create directory with uuid as directory name 
    const directoryPath = path.join(__dirname, '../../../blogposts', postId);
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
    }

    // create markdown file in blog post directory
    const newBlogPostPath = path.join(directoryPath, filename);
    fs.writeFileSync(newBlogPostPath, '');
    console.log(newBlogPostPath);

    // create write stream and write buffer data to that stream. 
    let fstream = fs.createWriteStream(newBlogPostPath);
    fstream.write(fileBuffer);
    fstream.on('close', function () {
        res.redirect('back');
    });
    res.send('success');
}