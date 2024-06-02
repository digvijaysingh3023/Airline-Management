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
    <div className="mainContainer">
      <div className="header">
        <Link to="/add_flight" className="btn">Add Flights</Link>
        <Link to="#" className="btn">Admin</Link>
      </div>
      
      <div className="content">
        <div className="menu">
          <ul>
            <li><button onClick={handleChange} name="admin_dashboard">Dashboard</button></li>
            <li><button onClick={handleChange} name="flight_manage">Manage Flights</button></li>
            <li><button onClick={handleChange} name="feedback">Feedback</button></li>
            <li><button onClick={handleChange} name="profile">Profile</button></li>
            <li><button onClick={handleSignOut}>Sign Out</button></li>
          </ul>
        </div>

        <div className="data">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
