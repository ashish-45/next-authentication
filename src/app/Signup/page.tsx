"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Axios from 'axios'

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
      let response = await Axios.post("/API/Users/Signup",user)
      console.log(response,"response");
      router.push("/Login")

    } catch (err:any) {
      toast.error("Signup Failed",err.message)
      
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4">{loading ? "Processing" : "Signup"}</h1>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="username"
        className="text-black"
        autoComplete="off"
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
        className="text-black"
        autoComplete="off"
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
        className="text-black"
        autoComplete="off"
      />
      <button
        className="p-2 max-w-80 inline bg-slate-400 mt-3 focus:border-gray-50 border-0 whitespace-nowrap"
        onClick={Signup}
        type="submit"
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href="/Login" className="text-white mt-4">
        Visit Login
      </Link>
    </div>
  );
}
