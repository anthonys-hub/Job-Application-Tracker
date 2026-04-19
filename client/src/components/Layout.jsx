import { useNavigate, NavLink, Outlet } from "react-router-dom";
import profilepic from "../assets/profilepic.avif";


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

                    <div className="flex flex-col">
                        <NavLink to="/dashboard" className={({ isActive }) => `px-4 py-3 rounded-xl cursor-pointer font-medium ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200 text-gray-700"}`}>Dashboard</NavLink>
                        <NavLink to='/applications' className={({ isActive }) => `px-4 py-3 rounded-xl cursor-pointer font-medium ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-200 text-gray-700"}`}>Applications</NavLink>
                    </div>
                </div>

                <h1 onClick={handleClear} className="px-4 py-3 rounded-xl cursor-pointer hover:bg-red-50 text-red-500 font-medium">Logout</h1>

            </div >






            {/*This is the outlet for sidebar wrapper do not touch */}
            < div className="flex-1 overflow-auto relative" >
                <Outlet />
            </div >

        </div >
    )
}