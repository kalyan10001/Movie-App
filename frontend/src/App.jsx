import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { isLoggedIn, getUserRole } from "./utils/auth";
import AddEditMovie from "./pages/Movies";

function PrivateRoute({ children, adminOnly = false }) {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  if (adminOnly && getUserRole() !== "admin") return <Navigate to="/" />;
  return children;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-movie" element={
          <PrivateRoute adminOnly={true}>
            <AddEditMovie />
          </PrivateRoute>
        } />
        <Route path="/edit-movie/:id" element={
          <PrivateRoute adminOnly={true}>
            <AddEditMovie />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
