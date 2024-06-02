import React from 'react';
import Layout from './Layout';
import "../../CSS/Profile.css"; // Import the profile-specific CSS

const Profile = ({setIsAdminLoggedIn}) => {
  // Sample admin data
  const adminData = {
    name: 'Admin Name',
    username: 'adminuser',
    password: 'password123',
  };

  return (
    <Layout setIsAdminLoggedIn={setIsAdminLoggedIn}>
      <div className="profile-box">
        <h2>Profile</h2>
        <div className="profile-item">
          <label>Name:</label>
          <p>{adminData.name}</p>
        </div>
        <div className="profile-item">
          <label>Username:</label>
          <p>{adminData.username}</p>
        </div>
        <div className="profile-item">
          <label>Password:</label>
          <p>{adminData.password}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
