"use client";

import Axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const Logout = async () => {
    try {
      const response = await Axios.get("/API/Users/Logout");
      console.log(response, "Response");
      toast("Logout Success")
      router.push("/Login");
    } catch (err: any) {
      console.log(err, "Logout Failed");
      toast(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile </h1>
      <hr />
      <p>Profile Page</p>
      <button className="bg-sky-700 p-3 mt-4 rounded-md" onClick={Logout}>
        Logout
      </button>
    </div>
  );
}
