"use client";

import Axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("noting");
  const Logout = async () => {
    try {
      const response = await Axios.get("/API/Users/Logout");
      console.log(response, "Response");
      toast("Logout Success");
      router.push("/Login");
    } catch (err: any) {
      console.log(err, "Logout Failed");
      toast(err.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await Axios.get("/API/Users/Me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (err: any) {
      console.log("User Details Not Found", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <hr />
      <p>Profile Page</p>
      <p className="bg-green-600 text-white p-1 rounded">
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/Profile/${data}`}>{data}</Link>
        )}
      </p>
      <button className="bg-red-700 p-3 mt-4 rounded-md" onClick={Logout}>
        Logout
      </button>

      <button
        className="bg-sky-700 p-3 mt-4 rounded-md"
        onClick={getUserDetails}
      >
        Get User Details
      </button>
    </div>
  );
}
