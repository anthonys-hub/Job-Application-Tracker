import { useNavigate, NavLink, Outlet } from "react-router-dom";
import profilepic from "../assets/profilepic.avif";
import { CgLogOut } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import { HiPaperAirplane } from "react-icons/hi2";





export default function Layout() {
    const navigate = useNavigate()
    const name = localStorage.getItem('name')


    function handleClear() {
        localStorage.clear();
        navigate('/');
    }





    return (



        <div className="flex  h-screen bg-[#f8fafc]">

            <div className="w-64 bg-[#f8fafc] flex flex-col justify-between py-5 px-6">

                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <img src={profilepic} alt="Profile picture" className="w-13 h-13 rounded-full object-cover" />
                        <h1>👋 Hello, {name}</h1>
                    </div>

                    <div className="flex flex-col gap-1">
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-600"
                                }`
                            }
                        >
                            <MdDashboard className="text-xl" />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/applications"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-colors ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-600"
                                }`
                            }
                        >
                            <HiPaperAirplane className="text-xl" />
                            <span>Applications</span>
                        </NavLink>
                    </div>
                </div>

                <div className="flex flex-row items-center">
                    <h1
                        onClick={handleClear}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl cursor-pointer hover:bg-red-50 text-red-500 font-medium transition-colors"
                    >
                        <CgLogOut className="text-xl" />
                        <span>Logout</span>
                    </h1>
                </div>

            </div >






            {/*This is the outlet for sidebar wrapper do not touch */}
            < div className="flex-1 overflow-auto relative" >
                <Outlet />
            </div >

        </div >
    )
}