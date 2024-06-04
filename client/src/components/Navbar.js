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
        <div className="navbar-container flex flex-row w-screen h-[60px] items-center justify-between min-w-[500px] bg-[#d9ddde] bg-opacity-60 fixed">
    <div className="logo w-[7rem] h-full pl-2 text-gray-800 text-xl font-bold">Airline<br />Management</div>
    <div className="flex h-full flex-grow max-w-[1200px]">
        <div className="nav-links flex flex-auto justify-between h-full pl-[10rem]">
            <button className="nav-button pl-2 pr-2 mt-3 w-auto min-w-fit rounded hover:bg-gray-300 bg-opacity-75 focus:outline-none" name="home" onClick={clickHandlePage}>Home</button>
            <button className="nav-button pl-2 pr-2 mt-3 w-auto min-w-fit rounded hover:bg-gray-300 bg-opacity-75 focus:outline-none" name="my_flights" onClick={clickHandlePage}>My Flights</button>
            <button className="nav-button pl-2 pr-2 mt-3 w-auto min-w-fit rounded hover:bg-gray-300 bg-opacity-75 focus:outline-none" name="contact" onClick={clickHandlePage}>Contact</button>
            <button className="nav-button pl-2 pr-2 mt-3 w-auto min-w-fit rounded hover:bg-gray-300 bg-opacity-75 focus:outline-none" name="about" onClick={clickHandlePage}>About</button>

            <div className="user-actions pr-5 h-full flex justify-center items-center">
                {isAuthenticated === false ? (
                    <button className="logout-button pl-2 pr-2 mt-3 w-auto min-w-fit rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none" onClick={clickHandleSignIn}>Sign In</button>
                ) : (
                    <div className="profile-menu relative">
                        <button className="profile-button pl-2 pr-2 mt-3 w-auto min-w-fit rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none" onClick={toggleDropdown}>User</button>
                        {dropdownVisible && (
                            <div className="dropdown-content absolute top-full right-0 mt-1 bg-white shadow-lg rounded-lg">
                                <button className="dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left focus:outline-none" onClick={clickHandleProfile}>Profile</button>
                                <button className="dropdown-item block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left focus:outline-none" onClick={clickHandleSignOut}>Sign Out</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
</div>
    );
}

export default Navbar;
