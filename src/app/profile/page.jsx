"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            alert("Logout failed. Please try again.");
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>Profile Page</h1>
            <hr />
            <p>Welcome to your profile!</p>
            <br />
            <button
                onClick={handleLogout}
            className="border border-gray-300 rounded px-2 py-1 mb-4 bg-blue-50 text-black active:scale-95"

            >logout</button>
        </div>
    );
}