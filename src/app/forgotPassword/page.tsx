"use client";
import Axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    try {
      await Axios.post("/API/Users/forgotPassword", { email });
      setMessage("Password reset email sent");
      setEmail("");
      setError("");
      router.push("/ResetPassword");
    } catch (err) {
      setError("Error sending password reset email");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black mb-2"
      />
      <button
        onClick={handleForgotPassword}
        className="bg-sky-300 p-3 text-black mt-2"
      >
        Reset Password
      </button>
      {message && <p className="text-2xl bg-green-300 mt-4 p-3 text-black">{message}</p>}
      {error && <p className="text-2xl bg-red-500 mt-4">{error}</p>}
    </div>
  );
}
