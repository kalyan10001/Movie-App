import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ role, handleLogout }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-xl">
          MovieApp
        </Link>
      </div>
      <div className="space-x-4">
        {role ? (
          <>
            {role === 'admin' && (
              <Link to="/add" className="hover:underline">
                Add Movie
              </Link>
            )}
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
