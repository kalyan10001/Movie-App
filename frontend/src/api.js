import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, setToken, role, setRole }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">🎬 MovieApp</Link>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login" className="hover:text-blue-400">Login</Link>
            <Link to="/register" className="hover:text-blue-400">Register</Link>
          </>
        ) : (
          <>
            {role === 'admin' && <Link to="/add" className="hover:text-blue-400">Add Movie</Link>}
            <button onClick={logout} className="hover:text-red-400">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
