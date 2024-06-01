import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css'; 

function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    function clickHandlePage(event) {
        navigate(`/${event.target.name}`);
    }

    function clickHandleSignOut() {
        setIsLoggedIn("false");
        localStorage.removeItem('token');
        navigate('/home');
    }

    function clickHandleSignIn() {
        navigate('/login');
    }

    function clickHandleProfile() {
        navigate('/user_profile');
    }

    function toggleDropdown() {
        setDropdownVisible(!dropdownVisible);
    }

    function closeDropdown() {
        setDropdownVisible(false);
    }

    return (
        <div className="navbar-container">
            <div className="logo">Airline Management</div>
            <div className="nav-links">
                <button className="nav-button" name="home" onClick={clickHandlePage}>Home</button>
                <button className="nav-button" name="my_flights" onClick={clickHandlePage}>My Flights</button>
                <button className="nav-button" name="contact" onClick={clickHandlePage}>Contact</button>
                <button className="nav-button" name="about" onClick={clickHandlePage}>About</button>
            </div>
            <div className="user-actions">
                {isLoggedIn === "false" ? (
                    <button className="logout-button" onClick={clickHandleSignIn}>Sign In</button>
                ) : (
                    <div className="profile-menu" onMouseLeave={closeDropdown}>
                        <button className="profile-button" onClick={toggleDropdown}>User</button>
                        {dropdownVisible && (
                            <div className="dropdown-content">
                                <button className="dropdown-item" onClick={clickHandleProfile}>Profile</button>
                                <button className="dropdown-item" onClick={clickHandleSignOut}>Sign Out</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
