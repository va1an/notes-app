import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 m-8 mt-20 md:mt-8">
                <Outlet />
            </main>
        </div>
    )
}