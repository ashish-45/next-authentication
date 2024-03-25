"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
        className="text-black"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="text-black"
      />
      <button
        className="p-2 max-w-80 inline bg-slate-400 mt-3 focus:border-gray-50 border-0 whitespace-nowrap"
        onClick={Login}
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href="/Signup" className="text-white mt-4">
        Visit Signup
      </Link>
    </div>
  );
}
