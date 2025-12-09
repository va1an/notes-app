import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute() {
    const { user } = useAuth();

    // If user is NOT logged in → redirect to login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // If logged in → show normal component
    return <Outlet />;
}
