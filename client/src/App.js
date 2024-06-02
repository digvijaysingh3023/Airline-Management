import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ViewFlights from './pages/ViewFlights';
import MyFlights from './pages/MyFlights';
import Contact from './pages/Contact';
import UserProfile from './pages/UserProfile';
import About from './pages/About';
import AddFlight from './pages/adminPages/AddFlight';
import FlightManage from './pages/adminPages/FlightManage';
import './App.css';
import { toast } from 'react-toastify';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import Feedback from './pages/adminPages/Feedback';
import Profile from './pages/adminPages/Profile'

function App() {
  const [viewFlightData,setViewFlightData]=useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsLoggedIn(response.status === 200);
    } catch (error) {
      toast.error(error)
      setIsLoggedIn(false);
    }
  };
    
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home setViewFlightData={setViewFlightData} setIsLoggedIn={isLoggedIn} isLoggedIn={isLoggedIn}/>} />

        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />

        <Route path="/my_flights" element={<MyFlights setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />

        <Route path="/view_flights" element={<ViewFlights viewFlightData={viewFlightData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />

        <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />

        <Route path="/contact" element={<Contact setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />

        <Route path="/user_profile" element={isLoggedIn?(<UserProfile setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>):(<Navigate to="/home" />)} />

        <Route path="*"  element={<Navigate to="/home" />} /> 

        <Route path="/admin_dashboard" element={isLoggedIn?(<AdminDashboard setIsLoggedIn={setIsLoggedIn}/>):(<Navigate to="/home"/>)} />

        <Route path="/add_flight" element={isLoggedIn?(<AddFlight setIsLoggedIn={setIsLoggedIn}/>):(<Navigate to="/home"/>)} />

        <Route path="/feedback" element={isLoggedIn?(<Feedback setIsLoggedIn={setIsLoggedIn}/>):(<Navigate to="/home"/>)} />

        <Route path="/flight_manage" element={isLoggedIn?(<FlightManage setIsLoggedIn={setIsLoggedIn}/>):(<Navigate to="/home"/>)} />

        <Route path="/profile" element={isLoggedIn?(<Profile setIsLoggedIn={setIsLoggedIn}/>):(<Navigate to="/home"/>)} />
      </Routes>
    </div>
  );
}

export default App;
