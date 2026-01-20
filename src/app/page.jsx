"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  
  return (
    <>
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Welcome to Next.js Auth App</h1>
      <hr />
      <p className="mt-4">Please <Link href="/login">login</Link> or <Link href="/signup">register</Link> to continue.</p>

    </div>
    </>
  );
}
