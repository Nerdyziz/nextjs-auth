"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserProfile({params}) {
    const {id} = React.use(params);
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
        <div className="flex flex-col items-center gap-8 justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page 
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
            </p>
            <br />
            <button
                onClick={handleLogout}
            className="border border-gray-300 rounded px-2 py-1 mb-4 bg-blue-50 text-black active:scale-95"

            >logout</button>

            </div>
    )
}