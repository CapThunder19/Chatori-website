import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authServices';
import { Link } from "react-router-dom";

const Login = () => {
    const [form,setform] = useState({email:"", password:""});
    const navigate = useNavigate();

    const Handlechange = (e) => {
        setform({...form,[e.target.name]: e.target.value });
    };

    const Handlesubmit = async (e) => {
        e.preventDefault();
        const res = await login(form);
    
        console.log("Login response:", res); // 👈 DEBUG
    
        if (res.token) {
            localStorage.setItem('token', res.token);
            navigate('/');
        } else {
            alert(res.msg || 'Login Failed'); // 👈 Use error from backend if exists
        }
    }
    
    
    

    return (
      <form 
        onSubmit={Handlesubmit} 
        className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
    
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={Handlechange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={Handlechange}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
        >
          Login
        </button>
    
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    );
    
}

export default Login