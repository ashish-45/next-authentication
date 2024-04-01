"use client"
export default function UserProfile({params}:any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile </h1>
        <hr />
        <p className="text-4xl text-center ">Profile Page <br/></p>
        <p className="bg-orange-400 text-3xl mt-3">{params.id}</p>
      </div>
    );
  }
  