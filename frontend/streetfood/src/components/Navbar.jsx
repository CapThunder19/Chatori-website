import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">Chatori</Link>
      </div>

      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:text-yellow-400 transition duration-300"> Home </Link>

        {isAuthenticated ? (
          <>
            <Link to="/add-stall" className="hover:text-yellow-400 transition duration-300">
              Add Stall
            </Link>

            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-gray-900 px-3 py-1 rounded hover:bg-yellow-300 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400 transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-yellow-400 transition duration-300">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

