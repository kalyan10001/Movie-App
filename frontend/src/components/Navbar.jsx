import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getUserRole, logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const role = getUserRole();

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">Movie Dashboard</Link>
      <div className="space-x-4">
        {loggedIn ? (
          <>
            <Link to="/">Dashboard</Link>
            {role === "admin" && <Link to="/add-movie">Add Movie</Link>}
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
