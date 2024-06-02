import React, { useState } from 'react';
import Layout from './Layout';
import "../../CSS/Addflight.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const AddFlight = () => {
  const navigate = useNavigate();
  const [flightDetails, setFlightDetails] = useState({
    "flightNo": '',
    "to": '',
    "from": '',
    "category": '',
    "totalSeats": 0,
    "date": '',
    "time": '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/admin/addflight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(flightDetails)
      });

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        toast.success("Successfully Added Flight");
        navigate('/admin_dashboard');
      } else {
        toast.error(data.message || "Authentication failed");
      }
    } catch (error) {
      toast.error("Network error, please try again later");
      console.error("Network error:", error);
    }
  };

  return (
    <Layout>
      <div className="add-flight-box">
        <h2>Add Flight</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>From:</label>
            <input type="text" name="from" value={flightDetails.from} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>To:</label>
            <input type="text" name="to" value={flightDetails.to} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Flight No.:</label>
            <input type="text" name="flightNo" value={flightDetails.flightNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              onChange={handleChange}
              value={flightDetails.category}
              required
            >
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
          <div className="form-group">
            <label>Schedule:</label>
            <input type="date" name="date" value={flightDetails.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Seats:</label>
            <input type="number" name="totalSeats" value={flightDetails.totalSeats} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input type="text" name="time" value={flightDetails.time} onChange={handleChange} required />
          </div>
          <button type="submit">Add Flight</button>
        </form>
      </div>
    </Layout>
  );
};

export default AddFlight;
