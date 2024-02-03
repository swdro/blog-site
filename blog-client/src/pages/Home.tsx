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
    const [pageData, setPageData] = useState({ limit: 20, page: 1 });

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
                <div className="text-xl md:text-2xl pb-16 flex items-center">
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
                                    <div className="flex items-center gap-5 text-sm md:text-base">
                                        <span className="text-secondary font-medium  font-['arial'] flex-none flex items-end">
                                            {formatDate(post.created_dt)}
                                        </span>
                                        <h1 onClick={() => handlePostClick(post.id)} className="text-black/75 text-xl w-fit flex-none cursor-pointer hover:text-black/50 hover:underline transition duration-500 ease-in-out">
                                            <Link to={`/post/${post.id}`}>
                                                &#123;{removeMDFileExt(post.title)}&#125;
                                            </Link>
                                        </h1>
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