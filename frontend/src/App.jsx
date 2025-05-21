import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddMovie from './pages/AddMovie.jsx';
import EditMovie from './pages/EditMovie.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }, [token, role]);

  const handleLogout = () => {
    setToken('');
    setRole('');
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <Navbar role={role} handleLogout={handleLogout} />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard token={token} role={role} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} setRole={setRole} />} />
          {role === 'admin' && <Route path="/add" element={<AddMovie token={token} />} />}
          {role === 'admin' && <Route path="/edit/:id" element={<EditMovie token={token} />} />}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
