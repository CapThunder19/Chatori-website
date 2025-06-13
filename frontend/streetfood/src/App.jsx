import React from "react"
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AddStall from "./pages/Addstall";
import StallDetails from "./pages/Stalldetail";
import SearchResults from "./pages/SearchResults";



function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
  <Router>
    <Navbar/>
    <Routes>
      <Route path='/' element={isAuthenticated? <Home/>:<Navigate to = "/login"/>} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/add-stall" element={<AddStall />} />
      <Route path="/stalls/:stallId" element={<StallDetails />} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>}/>
      
    </Routes>
  </Router>
  )
}

export default App
