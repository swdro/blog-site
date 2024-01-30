import { useState, useEffect } from "react";
import { getPosts } from "../api/apiUrls";
import { removeMDFileExt } from "../helper";

type PostType = {
    created_dt: string,
    id: string,
    title: string
}

export function Home() {

    const [posts, setPosts] = useState([]);
    const [pageData, setPageData] = useState({ limit: 20, page: 1 });

    useEffect(() => {
        getPosts(pageData).then((res) => {
            console.log(res);
            setPosts(res.data);
        });
    }, []);

    function handlePostClick(postId: string) {
        console.log(postId);
    }

    return (
        <div className="p-10">
            <div className="text-8xl font-medium pb-4 flex items-center">
                <div className="bg-gradient-to-r from-black to-black/80 bg-clip-text text-transparent">
                    TheSoftwareBlog
                </div>
                <div className="bg-gradient-to-r from-accent to-background bg-clip-text text-transparent">
                    ...............
                </div>
            </div>
            <div className="flex flex-col py-10 px-24 gap-14">
            {posts.map((post: PostType) => {
                const calendarDate = new Date(post.created_dt);
                return (
                    <div key={post.id}  className="text-center w-full">
                        <div className="flex gap-5">
                            <div className="text-secondary font-medium font-['arial'] flex-none flex items-end">
                                <div className="h-fit">{calendarDate.toLocaleDateString()}</div>
                            </div>
                            <div onClick={() => handlePostClick(post.id)} className="text-3xl w-fit flex-none cursor-pointer hover:text-black/50 transition duration-500 ease-in-out">
                                {removeMDFileExt(post.title)}
                            </div>
                            <div className="flex items-center w-full flex-1">
                                <hr className="flex-1 w-full border-secondary"/>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    );
}