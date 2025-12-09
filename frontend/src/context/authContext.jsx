import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function fetchUser() {
        try {
            const { data } = await API.get("/auth/me");
            setUser(data.user);
        }
        catch {
            setUser(null);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function logout() {
        await API.post("/auth/logout");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);