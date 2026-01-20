"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function ProfilePage() {
    const router = useRouter();
    const [userData, setUserData] = React.useState("");
    
    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/users/me");
            setUserData(response.data.user.username);
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Failed to fetch user data. Please try again.");
        }
    };

    React.useEffect(() => {
        fetchUserData();
        router.push(`/profile/${userData}`);
    }, [userData]);
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>Profile Page</h1>
            <hr />
            <p>Welcome to your profile!</p>
            
        </div>
    );
}