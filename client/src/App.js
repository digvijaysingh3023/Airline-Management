import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ViewFlights from './pages/ViewFlights';
import MyFlights from './pages/MyFlights';
import Contact from './pages/Contact';
import About from './pages/About';
import './App.css';
import {jwtDecode} from 'jwt-decode';

const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

function App() {

  const [username,setusername] = useState("");
  const [viewFlightData,setViewFlightData]=useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') || "false";
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    const token = localStorage.getItem('token');
    const decodedToken = decodeToken(token);
    if(token){
        if(!decodeToken){
            localStorage.removeItem('token');
            setIsLoggedIn("false");
        }
        else{
            const username_ = decodedToken['username'];
            setusername(username_);
        }
    }else{
      setusername("");
    }
  }, [isLoggedIn]);
    
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home setViewFlightData={setViewFlightData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/my_flights" element={<MyFlights setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/view_flights" element={<ViewFlights username={username} viewFlightData={viewFlightData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/contact" element={<Contact username={username} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="*"  element={<Navigate to="/Home" />} /> 
      </Routes>
    </div>
  );
}

export default App;
