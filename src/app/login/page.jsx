"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        if (!user.email || !user.password) {
            alert("Please fill in all fields");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/users/login", user);
            console.log("User logged in:", response);
            
            setUser({
                email: "",
                password: "",
            });
            router.push("/profile");

        } catch (error) {
            console.error("Error logging in:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>Login Page</h1>
            <hr />
            <label htmlFor="email">Email:</label>
            <input
                className="border border-gray-300 rounded px-2 py-1 mb-4 bg-blue-50 text-black"
                type="email"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                className="border border-gray-300 rounded px-2 py-1 mb-4 bg-blue-50 text-black"
                type="password"
                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <br />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Log In"}
            </button>   
            <p className="mt-4">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-500 underline">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}