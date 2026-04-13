import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import profilepic from "../assets/profilepic.avif";

export default function Layout() {
    const navigate = useNavigate()
    const name = localStorage.getItem('name')

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <div className="w-64 bg-[#f8fafc] flex flex-col justify-between py-8 px-6">

                <div className="flex items-center gap-3">

                    <img
                        src={profilepic}
                        alt="Profile picture"
                        className="w-13 h-13 rounded-full object-cover"

                    />
                    <h1 className="">Hello, {name}</h1>
                </div>











            </div>


            <div className="flex-1 overflow-auto">
                <Outlet />
            </div>
        </div>
    )
}