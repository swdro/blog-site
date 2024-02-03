import axios from 'axios';
console.log("meta.env: ", import.meta.env);
export const BASE_URL = import.meta.env.VITE_SERVER_URL;

const API = axios.create({ 
    baseURL: `${BASE_URL}`,
    withCredentials: true
});

// posts 
export const postBlogApi = (formData: FormData) => API.post("/post", formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const getPostsApi = (pageData: { limit: number, page: number }) => API.get("/posts", { params: pageData });
export const getPostApi = (postId: string) => API.get("/post", { params: { postId } })

// tags
export const getTagsApi = () => API.get("/tags");

// login
export const loginApi = (credentials: { username: string, password: string }) => API.post("/login", credentials);
