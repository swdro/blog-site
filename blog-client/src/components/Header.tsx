import { Outlet } from "react-router-dom";

export function Header() {
    return (
        <>
            <div className="bg-black rounded-b-l">
                Hi
            </div>
            <Outlet />
        </>
    );
}
