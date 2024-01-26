import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

/*
export function postController(req: Request, res: Response) {
    req.pipe(req.busboy);
    if (req.busboy) {
        req.busboy.on('file', (name, file, info) => {
            const filename = info.filename;
            console.log("info: ", info);
            console.log("filename: ", filename);
            console.log("file: ", file);

            // create markdown file in blog post directory
            const newBlogPostPath = path.join(__dirname, '../../../blogposts', filename);
            fs.writeFileSync(newBlogPostPath, '');
            console.log(newBlogPostPath);

            // create write stream and pipe file data to that stream. 
            let fstream = fs.createWriteStream(newBlogPostPath);
            file.pipe(fstream);
            fstream.on('close', function () {
                res.redirect('back');
            });
        });
    } 
}
*/

/*
import {StringDecoder} from 'node:string_decoder'

export function postController(req: Request, res: Response) {

    const decoder = new StringDecoder('utf-8');
    console.log(req.body);
    const reqBodyBuffer = Buffer.from(req.body);
    const reqBodyString = reqBodyBuffer.toString();
    console.log(reqBodyString);
    //console.log(decoder.write(reqBodyBuffer));

    //const bodyJson = reqBodyBuffer.toJSON(); 
    //console.log(bodyJson);
}
*/


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
    const createdDate = formData.createdDate;

    console.log(formData);
    console.log(filename);
    console.log(createdDate);

    // create markdown file in blog post directory
    const newBlogPostPath = path.join(__dirname, '../../../blogposts', filename);
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