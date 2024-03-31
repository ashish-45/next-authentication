"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const Login = async () => {
    try {
      setLoading(true);
      let response = await Axios.post("/API/Users/Login", user);
      console.log("Response", response.data);
      toast.success("Login Success");
      router.push("/Profile");
    } catch (err: any) {
      toast.error("Login Failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{loading ? "Processing" : "Login"}</h1>

      <label htmlFor="email" className="text-gray-800">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-80"
      />
      <label htmlFor="password" className="text-gray-800">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring focus:border-blue-300 w-80"
      />
      <button
        className={`p-2 max-w-80 inline bg-blue-500 mt-3 text-white rounded-lg ${buttonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"}`}
        onClick={Login}
        disabled={buttonDisabled}
      >
        {loading ? "Processing..." : "Login"}
      </button>
      <Link href="/Signup" className="text-blue-500 mt-4 underline">
        Visit Signup
      </Link>
    </div>
  );
}
