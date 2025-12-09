import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/authContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser, user } = useAuth();

    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const { data } = await API.post("/auth/login", { email, password });
            setUser(data.user);
        }
        catch (err) {
            alert(err.response?.data?.message || "Login failed")
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user])

    return (
        <div className="flex flex-col p-5 h-screen justify-center items-center bg-background">
            <form action={handleSubmit} className="w-full max-w-sm flex flex-col">
                <h1 className="font-inter font-bold text-text-dark text-3xl text-center">Welcome Back</h1>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-border w-full border-2 rounded-lg mt-4 p-2 outline-none" />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-border w-full border-2 rounded-lg mt-2 p-2 outline-none" />
                <button type="submit" className="bg-primary hover:bg-primary-light text-white rounded-lg mt-4 px-4 py-2 font-inter font-semibold cursor-pointer">Login</button>
            </form>
            <p className="mt-4 font-inter">Don't have an account? <span onClick={() => navigate('/register')} className="text-button cursor-pointer">Create account</span></p>
        </div>
    )
}