import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authServices';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [form,setform] = useState({username:"", email:"", password:""});
    const navigate = useNavigate();

    const Handlechange = (e)=>{
       setform({...form, [e.target.name]: e.target.value});
    }

    const Handlesubmit = async (e) => {
      e.preventDefault();
      const res = await signup(form);
      console.log("Signup response:", res);  // log full response
      if(res.token){
        console.log("Token found, saving to localStorage");
        localStorage.setItem('token', res.token);
        navigate('/');
      } else {
        console.log("No token in response");
        alert("Signup failed");
      }
    }
    
    
    

    return (
      <form 
        onSubmit={Handlesubmit} 
        className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Signup</h2>
    
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={Handlechange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    
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
          SignUp
        </button>
    
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    );
    
}

export default Signup