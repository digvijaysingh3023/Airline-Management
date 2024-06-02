import Layout from './Layout';
import "../../CSS/FlightManagement.css"; 
import React, { useEffect, useState, useRef } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FlightManage = ({ setIsLoggedIn }) => {
  const initialFlights = [
    { id: 1, from: 'New York', to: 'London', flightNo: 'AA101', category: 'Economy', schedule: '10:00 AM', seats: 150 },
    { id: 2, from: 'Los Angeles', to: 'Tokyo', flightNo: 'JL002', category: 'Business', schedule: '2:00 PM', seats: 200 },
    { id: 3, from: 'Chicago', to: 'Paris', flightNo: 'AF123', category: 'First Class', schedule: '6:00 AM', seats: 50 },
    { id: 4, from: 'Miami', to: 'Madrid', flightNo: 'IB456', category: 'Economy', schedule: '12:00 PM', seats: 150 },
    { id: 5, from: 'Houston', to: 'Berlin', flightNo: 'LH789', category: 'Economy', schedule: '9:00 PM', seats: 150 },
    { id: 6, from: 'San Francisco', to: 'Beijing', flightNo: 'CA321', category: 'Business', schedule: '5:00 AM', seats: 200 },
    { id: 7, from: 'Seattle', to: 'Dubai', flightNo: 'EK654', category: 'First Class', schedule: '3:00 PM', seats: 50 },
    { id: 8, from: 'Denver', to: 'Rome', flightNo: 'AZ987', category: 'Economy', schedule: '8:00 AM', seats: 150 },
    { id: 9, from: 'Orlando', to: 'Sydney', flightNo: 'QF765', category: 'Business', schedule: '11:00 PM', seats: 200 },
    { id: 10, from: 'Atlanta', to: 'Amsterdam', flightNo: 'KL123', category: 'Economy', schedule: '1:00 PM', seats: 150 }
  ];

  const [flights, setFlights] = useState(initialFlights);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formValues, setFormValues] = useState({
    id: '',
    from: '',
    to: '',
    flightNo: '',
    category: '',
    schedule: '',
    seats: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    // Uncomment the below lines if you want to fetch data from an API
    // fetch_data();
  }, []);

  // Scroll to form when editingFlight changes
  useEffect(() => {
    if (editingFlight) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingFlight]);

  // Uncomment this function if you want to fetch data from an API
  // async function fetch_data() {
  //   try {
  //     const response = await fetch('url-to-fetch-data', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       },
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setFlights(data.flights);
  //     } else {
  //       console.log(data);
  //       toast.error(data.message || "Error Occurred");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Network error, please try again later");
  //   }
  // }

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormValues(flight);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`url-to-delete-flight/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setFlights(flights.filter(flight => flight.id !== id));
        toast.success("Flight deleted successfully");
      } else {
        const data = await response.json();
        toast.error(data.message || "Error Occurred");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error, please try again later");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`url-to-update-flight/${formValues.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        setFlights(flights.map(flight => flight.id === formValues.id ? formValues : flight));
        setEditingFlight(null);
        toast.success("Flight updated successfully");
      } else {
        const data = await response.json();
        toast.error(data.message || "Error Occurred");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error, please try again later");
    }
  };

  return (
    <Layout setIsLoggedIn={setIsLoggedIn}>
      <div className="box">
        <h2>Flight Management</h2>
        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Flight No.</th>
              <th>Category</th>
              <th>Schedule</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(flight => (
              <tr key={flight.id}>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
                <td>{flight.flightNo}</td>
                <td>{flight.category}</td>
                <td>{flight.schedule}</td>
                <td>{flight.seats}</td>
                <td>
                  <button onClick={() => handleEdit(flight)}>Edit</button>
                  <button onClick={() => handleDelete(flight.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingFlight && (
        <div ref={formRef} className="modal">
          <div className="modal-content">
            <h2>Edit Flight</h2>
            <form onSubmit={handleSubmit}>
              <label>From:</label>
              <input type="text" name="from" value={formValues.from} onChange={handleChange} required />
              <label>To:</label>
              <input type="text" name="to" value={formValues.to} onChange={handleChange} required />
              <label>Flight No:</label>
              <input type="text" name="flightNo" value={formValues.flightNo} onChange={handleChange} required />
              <label>Category:</label>
              <input type="text" name="category" value={formValues.category} onChange={handleChange} required />
              <label>Schedule:</label>
              <input type="text" name="schedule" value={formValues.schedule} onChange={handleChange} required />
              <label>Seats:</label>
              <input type="number" name="seats" value={formValues.seats} onChange={handleChange} required />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingFlight(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FlightManage;
