import React from 'react';
import Layout from './Layout';

const AdminDashboard = ({setIsLoggedIn}) => {
  return (
    <Layout setIsLoggedIn={setIsLoggedIn}>
      <div className="box">
        <h2>Total Available Flights</h2>
        <h5>10</h5>
      </div>
      <div className="box">
        <h2>Total Available Flights</h2>
        <h5>10</h5>
      </div>
      <div className="box">
        <h2>Total Available Flights</h2>
        <h5>10</h5>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
