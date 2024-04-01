"use client";
import React from "react";
import Axios from "axios";
import { useRouter } from "next/navigation";


export default function UserProfile({ params }: any) {
  const router = useRouter();

  const Logout = async () => {
    try {
      const response = await Axios.get("/API/Users/Logout");
      console.log(response, "Response");
      router.push("/Login");
    } catch (err: any) {
      console.log(err, "Logout Failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <hr />
      <p className="text-4xl text-center ">
        Profile Page <br />
      </p>
      <p className="bg-orange-400 text-3xl mt-3">{params.id}</p>

      <button className="bg-red-700 p-3 mt-4 rounded-md" onClick={Logout}>
        Logout
      </button>
    </div>
  );
}
