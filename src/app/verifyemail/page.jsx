"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    const verifyUserEmail = async () => {
        try {
            
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
            alert("Email verified successfully! Redirecting to login page...");
        } catch (error) {
            setError(true);
            console.log(error.reponse.data);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">{verified ? "Email Verified Successfully!" : "Verify Email Send to Your Inbox"}</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    {router.push("/login")}
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )

}