"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
 
  const handleSignup = async () => {
    setLoading(true);
    if (!user.username || !user.email || !user.password) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      console.log("Signing up user:", user);
      const response = await axios.post("/api/users/signup", user);
      console.log("User signed up:", response);
      router.push("/verifyemail");
      setUser({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Signup Page</h1>
      <hr />
      <label htmlFor="username">Username:</label>
      <input 
        className="border border-gray-300 rounded px-2 py-1 mb-4 bg-blue-50 text-black"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <br />
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
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button> 
      <Link href="/login" className="mt-4 text-blue-500 hover:underline">
        Already have an account? Log in
      </Link>

    </div>
  );
}
