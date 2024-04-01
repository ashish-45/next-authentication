// "use client";
// import React, { useState,useEffect} from "react";
// import Axios from "axios";
// import { useRouter } from 'next/router';

// const ResetPassword = () => {
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const router = useRouter();

//   const { token } = router.query;

//   useEffect(() => {
//     if (!token) {
//       setError("Token not found in URL");
//     }
//   }, [token]);

//   const handleResetPassword = async (e: any) => {
//     e.preventDefault();
//     try {
//       if (newPassword!== confirmPassword) {
//         setError("Passwords do not match");
//         return;
//       }
//       await Axios.post("/API/Users/ResetPassword", { newPassword,token});
//       setMessage("Password reset successful.");
//       setError("");
//       setConfirmPassword("");
//       router.push("/Login");
//     } catch (err: any) {
//       setMessage("Password reset failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>

//       <input
//         type="text"
//         placeholder="password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         required
//         className="text-black"
//       />
//       <input
//         type="password"
//         placeholder="Conform password"
//         value={confirmPassword}
//         onChange={(e) => setConfirmPassword(e.target.value)}
//         required
//         className="text-black"
//       />
//       <button type="submit" className="bg-pink-200 p-2" onClick={handleResetPassword}>
//         Reset Password
//       </button>
//       {message && (
//         <p className="text-2xl bg-green-300 mt-4 p-3 text-black">{message}</p>
//       )}
//       {error && <p className="text-2xl bg-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default ResetPassword;