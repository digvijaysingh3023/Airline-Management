import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ViewFlights from './pages/ViewFlights';
import MyFlights from './pages/MyFlights';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import './App.css';
import axios from 'axios';

function App() {
  const [viewFlightData,setViewFlightData]=useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState("false");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoggedIn(response.status === 200);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };
    
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home setViewFlightData={setViewFlightData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/my_flights" element={<MyFlights setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/view_flights" element={<ViewFlights viewFlightData={viewFlightData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/contact" element={<Contact setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/user_profile" element={<UserProfile setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="*"  element={<Navigate to="/Home" />} /> 
      </Routes>
    </div>
  );
}

export default App;
