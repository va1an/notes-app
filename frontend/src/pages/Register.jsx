import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import API from "../api/axios";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit() {
        try {
            const { data } = await API.post("/auth/signup", { name, email, password });
            setUser(data.user);
            navigate("/dashboard");
        }
        catch (err) {
            alert(err.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="flex flex-col h-screen p-4 justify-center items-center">
            <h2 className="font-inter text-text-dark font-bold text-2xl">Create an Account</h2>
            <form action={handleSubmit} className="flex flex-col w-full max-w-sm">
                <input type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} className="outline-none p-2 mt-4 border-2 border-border rounded-lg w-full" />
                <input type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} className="outline-none p-2 mt-2 border-2 border-border rounded-lg w-full" />
                <input type="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} className="outline-none p-2 mt-2 border-2 border-border rounded-lg w-full" />
                <button type="submit" className="font-inter bg-primary hover:bg-primary-light text-white mt-4 rounded-xl cursor-pointer px-4 py-2">Register</button>
            </form>
            <p className="font-inter mt-4">Already have an account? <span onClick={() => navigate('/')} className="font-inter text-primary cursor-pointer">Login</span ></p>
        </div>
    )
}