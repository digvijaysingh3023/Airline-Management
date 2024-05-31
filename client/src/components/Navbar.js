import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Navbar.css'; 

function Navbar({isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    function clickHandlePage(event) {
        navigate(`/${event.target.name}`);
    }

    function clickHandleSignOut() {
        setIsLoggedIn("false");
        localStorage.removeItem('token')
        navigate('/home');
    }

    function clickHandleSignIn(){
        navigate('/login');
    }

    return (
        <div className="navbar-container">
            <div className="logo">Airline Management</div>
            <div className="nav-links">
                <button className="nav-button" name="home" onClick={clickHandlePage}>Home</button>
                <button className="nav-button" name="book_flight" onClick={clickHandlePage}>Book Flight</button>
                <button className="nav-button" name="schedule_flight" onClick={clickHandlePage}>Schedule Flight</button>
                <button className="nav-button" name="contact" onClick={clickHandlePage}>Contact</button>
                <button className="nav-button" name="about" onClick={clickHandlePage}>About</button>
            </div>
            <div>
                {isLoggedIn==="false"?(
                    <button className="logout-button" onClick={clickHandleSignIn}>Sign IN</button>
                ):(
                    <button className="logout-button" onClick={clickHandleSignOut}>Sign Out</button>
                )}
                
            </div>
        </div>
    );
}

export default Navbar;
