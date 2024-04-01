"use client"
import Axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const VerifyUserEmail = async () => {
    try {
      await Axios.post("/API/Users/verifyemail", { token });
      setVerified(true);
    } catch (err: any) {
      setError(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      VerifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Verify Email</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl mb-4 text-black">Token:</h2>
        <p className="bg-orange-400 text-black p-2 rounded-md">{token ? `${token}` : "No Token"}</p>
        {verified && (
          <div className="mt-6">
            <h2 className="text-2xl text-green-500">Email Verified</h2>
            <Link href="/Login">
              <span className="text-blue-500 mt-2 block">Login</span>
            </Link>
          </div>
        )}
        {error && (
          <div className="mt-6">
            <h2 className="text-2xl text-red-500">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
