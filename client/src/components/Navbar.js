import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css'; 
import AuthContext from '../authContext';
import { toast } from 'react-toastify';
    
function Navbar() {
    const navigate = useNavigate();
    const  {logout , isAuthenticated}  = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    // console.log(logout);

    function clickHandlePage(event) {
        navigate(`/${event.target.name}`);
    }

    function clickHandleSignOut() {
        logout();
        console.log(isAuthenticated);
        toast.info("Logged Out!")
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
                {isAuthenticated === false ? (
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
