import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostApi } from "../api/apiUrls";
import { formatDate, removeMDFileExt } from "../helper";
import Markdown from "react-markdown";

type PostTagsType = {
    tagName: string,
    tagId: number 
}

type PostType = {
    title: string,
    createdDate: string,
    markdownString: string,
    postTags: PostTagsType[] 
}

export function Post() {

    const postId = useParams().id;
    const [post, setPost] = useState<PostType>();

    useEffect(() => {
        console.log(postId);
        getPostApi(String(postId)).then((res) => {
            console.log(res);
            setPost(res.data);
        });
    }, []);

    return (
        <div>
            {post && 
                <div className="p-8 md:p-36 lg:p-48 py-20 flex justify-center">
                    <div className="xl:w-3/5">
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="">
                                <span className="text-secondary text-base">{formatDate(post.createdDate)}</span>
                            </div>
                            <div>
                                <div className="flex flex-col gap-3 mb-14">
                                    <h1 className=" text-5xl">{removeMDFileExt(post.title)}</h1>
                                    <ul className="flex flex-wrap gap-2">
                                        {post.postTags.map((postTag: PostTagsType) => (
                                                <li className="list-none">
                                                    <p className="bg-accent/20 text-accent px-2 rounded-lg">
                                                        {postTag.tagName}
                                                    </p>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <Markdown>{post.markdownString}</Markdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}