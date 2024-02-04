import { useState, useEffect } from "react";
import { getPostsApi } from "../api/apiUrls";
import { removeMDFileExt, formatDate } from "../helper";
import { Link } from "react-router-dom";

type PostType = {
    created_dt: string,
    id: string,
    title: string
}

export function Home() {

    const [posts, setPosts] = useState([]);
    const [pageData] = useState({ limit: 20, page: 1 });

    useEffect(() => {
        getPostsApi(pageData).then((res) => {
            console.log(res);
            setPosts(res.data);
        });
    }, []);

    function handlePostClick(postId: string) {
        console.log(postId);
    }

    return (
        <div className="p-8 md:p-36 lg:p-48 flex justify-center">
            <div className="md:w-3/5">
                <div className="text-xl md:text-2xl md:pb-16 flex items-center">
                    <div className="bg-gradient-to-r from-black to-black/80 bg-clip-text text-transparent">
                        The Software Blog 
                    </div>
                    <div className="bg-gradient-to-r from-accent to-background bg-clip-text text-transparent">
                        ...............
                    </div>
                </div>
                <div className="flex flex-col py-10 gap-4">
                    <div className="text-accent font-medium font-['arial']">
                        Recently Published
                    </div>
                    <div>
                        {posts.map((post: PostType) => {
                            return (
                                <li key={post.id}  className=" list-none">
                                    <div className="flex place-items-start gap-5 w-fit md:text-base flex-auto text-wrap break-words whitespace-normal">
                                        <span className="text-secondary font-medium text-xs md:text-base  font-['arial'] flex-none flex items-end">
                                            {formatDate(post.created_dt)}
                                        </span>
                                        <div onClick={() => handlePostClick(post.id)} className="text-black/75 text-wrap cursor-pointer hover:text-black/50 hover:underline transition duration-500 ease-in-out">
                                            <Link to={`/post/${post.id}`} className="">
                                                &#123;{removeMDFileExt(post.title)}&#125;
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}