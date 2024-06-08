import Layout from './Layout';
import "../../CSS/FlightManagement.css"; 
import React, { useEffect, useState, useRef } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../../components/Loading';

const FlightManage = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formValues, setFormValues] = useState({
    id: '',
    from: '',
    to: '',
    flightNo: '',
    category: '',
    time: '',
    seats: ''
  });

  const formRef = useRef(null);

  useEffect(() => {
    fetch_data();
  }, []);

  // Scroll to form when editingFlight changes
  useEffect(() => {
    if (editingFlight) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingFlight]);

  async function fetch_data() {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/admin/getallflights', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFlights(data.flights);
        setTimeout(() => {
          setIsLoading(false)
        }, 1500);      } else {
        toast.error(data.message || "Error Occurred");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error, please try again later");
    }
  }

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormValues(flight);
  };

  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/admin/deleteFlight/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      console.log(data);
      if (data.status) {
        setFlights(data["flights"]);
        setTimeout(() => {
          setIsLoading(false)
        }, 1500);
        toast.success(data.message);
      } else {
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
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/admin/updateFlight/${formValues._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formValues)
      });

      if (response.ok) {
        setFlights(flights.map(flight => flight._id === formValues._id ? formValues : flight));
        setEditingFlight(null);
        setTimeout(() => {
          setIsLoading(false)
        }, 1500);
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
    <div className={isLoading ? 'loading' : 'loaded'}>
      <Loading isLoading={isLoading} />
      <div className="content_">
    <Layout> 
        <div className="box-FM">
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
                <tr key={flight._id}>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.flightNo}</td>
                  <td>{flight.category}</td>
                  <td>{flight.time}</td>
                  <td>{flight.totalSeats}</td>
                  <td>
                    <button onClick={() => handleEdit(flight)}>Edit</button>
                    <button onClick={() => handleDelete(flight._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editingFlight && (
          <div ref={formRef} className="modal-FM">
            <div className="modal-content-FM">
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
                <input type="text" name="time" value={formValues.time} onChange={handleChange} required />
                <label>Seats:</label>
                <input type="number" name="totalSeats" value={formValues.totalSeats} onChange={handleChange} required />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingFlight(null)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
    </Layout>
    </div>
    </div>
  );
};

export default FlightManage;
