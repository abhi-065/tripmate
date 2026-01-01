import { useState } from "react";
import API from "../api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const submit = async () => {
  const res = await API.post("/auth/forgot-password", { email });

  // Auto redirect to reset page with token
  window.location.href = `/reset?token=${res.data.token}`;
};


  return (
    <div className="p-10">
      <h2 className="text-xl font-bold">Forgot Password</h2>

      <input
        placeholder="Enter email"
        className="border p-2 block my-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={submit} className="bg-blue-600 text-white px-4 py-2">
        Get Reset Token
      </button>

      {token && (
        <p className="mt-4 text-green-600">
          Token: {token}
        </p>
      )}
    </div>
  );
}
