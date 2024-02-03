import { useState } from "react"
import { loginApi } from "../api/apiUrls";
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser() {
        try {
            const credentials = { username , password };
            const response = await loginApi(credentials);
            if (response.status === 200) {
                console.log(response);
                setError("");
                navigate("/createpost");
            }
        } catch (e: any) {
            setError(e.response.data);
            console.log("error catch: ", e);
        }
    }

    return (
        <>
        <div className=" h-screen flex flex-col justify-center items-center">
            <div className="text-3xl p-5 font-medium">Sign In</div>
            <div className="p-7 flex flex-col gap-7  md:w-96">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="font-light" htmlFor="email">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} id="email" className="focus-visible:ring-0 focus-visible:ring-offset-0"></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-light" htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" className="focus-visible:ring-0 focus-visible:ring-offset-0"></input>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <button onClick={loginUser}>
                        Login
                    </button>
                </div>
                <div className=" text-red-600 text-sm">
                    {error}
                </div>
            </div>
        </div>
        </>
    )
}