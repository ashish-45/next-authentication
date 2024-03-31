"use client"
import Axios from "axios";
import { useState } from "react";
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
      // router.push("/ResetPassword");
    } catch (err) {
      setError("Error sending password reset email");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 mt-2 focus:outline-none focus:ring focus:border-blue-300 w-80"
      />
      <button
        onClick={handleForgotPassword}
        className="bg-blue-500 text-white p-3 rounded-lg mt-4 w-80"
      >
        Reset Password
      </button>
      {message && <p className="text-lg bg-green-200 mt-4 p-3 text-gray-800 rounded-lg w-80">{message}</p>}
      {error && <p className="text-lg bg-red-200 mt-4 p-3 text-gray-800 rounded-lg w-80">{error}</p>}
    </div>
  );
}
