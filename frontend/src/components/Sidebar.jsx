import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    return (
        <>
            <div className="md:hidden flex items-center justify-between p-4 shadow bg-white fixed top-0 w-full z-50">
                <button onClick={() => setOpen(true)}><Menu size={28} /></button>
            </div>

            {open && (
                <div
                    className="fixed inset-0 bg-black/50 md:hidden z-40"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            <div className={`fixed top-0 left-0 h-full md:h-screen w-64 p-5 bg-white shadow-xl flex flex-col z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}>
                <div className="md:hidden flex justify-between items-center mb-6">
                    <h1 className="font-bold text-xl text-black">Menu</h1>
                    <button onClick={() => setOpen(false)}>
                        <X size={28} />
                    </button>
                </div>

                <h1 className="hidden md:block font-inter text-2xl text-primary font-bold mb-8">Notes</h1>

                <div className="flex flex-col flex-1 justify-between pt-5">
                    <nav className="flex flex-col space-y-3">
                        <button onClick={() => navigate("/add-note")} className="font-inter font-bold text-white bg-primary py-2 rounded-lg hover:bg-primary-light cursor-pointer">+ Add Note</button>
                        <NavLink to={'/dashboard'} onClick={() => setOpen(false)} className={({ isActive }) => `p-3 rounded-lg font-inter cursor-pointer transition-all ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}>Dashboard</NavLink>
                        <NavLink to={'/important'} onClick={() => setOpen(false)} className={({ isActive }) => `p-3 rounded-lg font-inter cursor-pointer transition-all ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}>Important</NavLink>
                        <NavLink to={'/tags'} onClick={() => setOpen(false)} className={({ isActive }) => `p-3 rounded-lg font-inter cursor-pointer transition-all ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}>Tags</NavLink>
                        <NavLink to={'/settings'} onClick={() => setOpen(false)} className={({ isActive }) => `p-3 rounded-lg font-inter cursor-pointer transition-all ${isActive ? "bg-primary text-white" : "hover:bg-gray-100"}`}>Settings</NavLink>
                        <button onClick={logout} className="font-inter font-bold text-white bg-red-500 rounded-lg hover:bg-red-400 cursor-pointer py-2">Logout</button>
                    </nav>
                </div>
            </div >
        </>
    )
}