"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const Signup = async () => {
    try {
      setLoading(true);
      let response = await Axios.post("/API/Users/Signup", user);
      console.log(response, "response");
      toast.success("Signup Success");
      router.push("/Login");
    } catch (err: any) {
      toast.error("Signup Failed", err.message);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0 && user.username.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{loading ? "Processing" : "Signup"}</h1>
      <label htmlFor="username" className="text-gray-800">Username</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-80"
        autoComplete="off"
      />
      <label htmlFor="email" className="text-gray-800">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-80"
        autoComplete="off"
      />
      <label htmlFor="password" className="text-gray-800">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-80"
        autoComplete="off"
      />
      <button
        className={`p-2 max-w-80 inline bg-blue-500 mt-3 text-white rounded-lg ${buttonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"}`}
        onClick={Signup}
        disabled={buttonDisabled}
      >
        {loading ? "Processing..." : "Signup"}
      </button>
      <Link href="/Login" className="text-blue-500 mt-4 underline">
        Visit Login
      </Link>
      <Link href="/forgotPassword" className="text-blue-500 mt-4 underline">
        Forgot Password
      </Link>
    </div>
  );
}
