import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import "../../CSS/Layout.css"; 
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../authContext';

const Layout = ({children}) => {
  const navigate=useNavigate();
  const {logout} = useContext(AuthContext)
  
  function handleChange(event){
    navigate(`/${event.target.name}`)
  }
  function handleSignOut(){
      logout();
      navigate('/home');
  }
  return (
    <div className="mainContainer-layout">
      <div className="header-layout">
        <Link to="/add_flight" className="btn-layout">Add Flights</Link>
        <Link to="/admin_dashboard" className="btn-layout">Admin</Link>
      </div>
      
      <div className="content-layout">
        <div className="menu-layout">
          <ul>
            <li><button onClick={handleChange} name="admin_dashboard">Dashboard</button></li>
            <li><button onClick={handleChange} name="flight_manage">Manage Flights</button></li>
            <li><button onClick={handleChange} name="feedback">Feedback</button></li>
            <li><button onClick={handleChange} name="profile">Profile</button></li>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </ul>
        </div>

        <div className="data-layout">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
