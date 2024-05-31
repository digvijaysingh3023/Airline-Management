import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ScheduleFlight from './pages/ScheduleFlight';
import BookFlight from './pages/BookFlight';
import Contact from './pages/Contact';
import About from './pages/About';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') || "false";
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/book_flight" element={isLoggedIn === "true" ? <BookFlight isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/schedule_flight" element={isLoggedIn === "true" ? <ScheduleFlight isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/about"  element={isLoggedIn === "true" ? <About isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/contact"  element={isLoggedIn === "true" ? <Contact isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="*"  element={<Navigate to="/Home" />} /> 
      </Routes>
    </div>
  );
}

export default App;
