import { useState } from "react";
import API from "../api";

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const tokenFromURL = params.get("token");

  const [password, setPassword] = useState("");

  const reset = async () => {
    await API.post("/auth/reset-password", {
      token: tokenFromURL,
      newPassword: password
    });

    alert("Password reset successful");
    window.location.href = "/login";
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>

      <input
        type="password"
        placeholder="New Password"
        className="border p-2 block mb-3"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={reset}
        className="bg-green-600 text-white px-4 py-2"
      >
        Reset Password
      </button>
    </div>
  );
}
