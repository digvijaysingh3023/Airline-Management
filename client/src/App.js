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
<<<<<<< Updated upstream
import { toast } from 'react-toastify';
=======
import AdminDashboard from './pages/adminPages/AdminDashboard';
import Feedback from './pages/adminPages/Feedback';
import Profile from './pages/adminPages/Profile'
import axios from 'axios';
>>>>>>> Stashed changes

function App() {
  const [viewFlightData,setViewFlightData]=useState([]);
  
<<<<<<< Updated upstream
  const [isLoggedIn, setIsLoggedIn] = useState(false);
=======
  const [isUserLoggedIn, setIsUserLoggedIn] = useState("false");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState("false");
>>>>>>> Stashed changes

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyTokenUser(token);
      verifyTokenAdmin(token);
    }
  }, []);

  const verifyTokenUser = async (token) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsUserLoggedIn(response.status === 200);
    } catch (error) {
<<<<<<< Updated upstream
      toast.error(error)
      setIsLoggedIn(false);
=======
      setIsUserLoggedIn(false);
    }
  };

  const verifyTokenAdmin = async (token) => {
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsAdminLoggedIn(response.status === 200);
    } catch (error) {
      setIsAdminLoggedIn(false);
>>>>>>> Stashed changes
    }
  };
    
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home setViewFlightData={setViewFlightData} setIsLoggedIn={setIsUserLoggedIn} isLoggedIn={isUserLoggedIn}/>} />
        <Route path="/login" element={<Login isLoggedIn={isUserLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn}/>} />
        <Route path="/my_flights" element={<MyFlights setIsLoggedIn={setIsUserLoggedIn} isLoggedIn={isUserLoggedIn}/>} />
        <Route path="/view_flights" element={<ViewFlights viewFlightData={viewFlightData} setIsLoggedIn={setIsUserLoggedIn} isLoggedIn={isUserLoggedIn}/>} />
        <Route path="/about" element={<About setIsLoggedIn={setIsUserLoggedIn} isLoggedIn={isUserLoggedIn}/>} />
        <Route path="/contact" element={<Contact setIsLoggedIn={setIsUserLoggedIn} isLoggedIn={isUserLoggedIn}/>} />
        <Route path="/user_profile" element={isUserLoggedIn==="true"?(<UserProfile setIsLoggedIn={setIsUserLoggedIn} isLoggedIn={isUserLoggedIn}/>):(<Navigate to="/home" />)} />
        <Route path="*"  element={<Navigate to="/home" />} /> 

        {/* Admin pages */}
        <Route path="/admin_dashboard" element={isAdminLoggedIn==="true"?(<AdminDashboard setIsAdminLoggedIn={setIsAdminLoggedIn}/>):(<Navigate to="/home"/>)} />
        <Route path="/add_flight" element={isAdminLoggedIn==="true"?(<AddFlight setIsAdminLoggedIn={setIsAdminLoggedIn}/>):(<Navigate to="/home"/>)} />
        <Route path="/feedback" element={isAdminLoggedIn==="true"?(<Feedback setIsAdminLoggedIn={setIsAdminLoggedIn}/>):(<Navigate to="/home"/>)} />
        <Route path="/flight_manage" element={isAdminLoggedIn==="true"?(<FlightManage setIsAdminLoggedIn={setIsAdminLoggedIn}/>):(<Navigate to="/home"/>)} />
        <Route path="/profile" element={isAdminLoggedIn==="true"?(<Profile setIsAdminLoggedIn={setIsAdminLoggedIn}/>):(<Navigate to="/home"/>)} />
      </Routes>
    </div>
  );
}

export default App;
