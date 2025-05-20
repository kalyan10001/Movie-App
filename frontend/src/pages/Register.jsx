import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name, email, password, role });
      setSuccess("Registered! You can now login.");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl mb-4 font-semibold">Register</h1>
      {error && <div className="mb-3 text-red-600">{error}</div>}
      {success && <div className="mb-3 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text" placeholder="Name" required
          className="w-full border px-3 py-2 rounded"
          value={name} onChange={e => setName(e.target.value)}
        />
        <input
          type="email" placeholder="Email" required
          className="w-full border px-3 py-2 rounded"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password" placeholder="Password" required
          className="w-full border px-3 py-2 rounded"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <select
          className="w-full border px-3 py-2 rounded"
          value={role} onChange={e => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
