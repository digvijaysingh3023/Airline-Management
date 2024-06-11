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
    seats: '',
    date: ''
  });

  const [filters, setFilters] = useState({
    date: '',
    category: ''
  });

  const [sortConfig, setSortConfig] = useState({
    key: 'totalSeats',
    direction: 'ascending'
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
        }, 1500);      
      } else {
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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      category: ''
    });
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedFlights = flights.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredFlights = sortedFlights.filter(flight => {
    const filterDate = filters.date ? new Date(filters.date) : null;
    const flightDate = flight.date ? new Date(flight.date) : null;
    return (
      (!filters.date || (filterDate && flightDate && filterDate.toDateString() === flightDate.toDateString())) &&
      (!filters.category || flight.category.toLowerCase().includes(filters.category.toLowerCase()))
    );
  });

  return (
    <div className={isLoading ? 'loading' : 'loaded'}>
      <Loading isLoading={isLoading} />
      <div className="content_">
    <Layout> 
        <div className="box-FM">
          <h2>Flight Management</h2>

          {/* Filter Section */}
          <div className="filter-section">
            <h3>Filter Flights</h3>
            <label>Date:</label>
            <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
            <label>Category:</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="First Class">First Class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business Class</option>
            </select>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>

          {/* Sort Section */}
          <div className="sort-section">
            <h3>Sort Flights</h3>
            <button onClick={() => handleSort('totalSeats')}>
              Sort by Seats {sortConfig.key === 'totalSeats' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </button>
            <button onClick={() => handleSort('date')}>
              Sort by Date {sortConfig.key === 'date' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Flight No.</th>
                <th>Category</th>
                <th>Schedule</th>
                <th>Seats</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFlights.map(flight => (
                <tr key={flight._id}>
                  <td>{flight.from}</td>
                  <td>{flight.to}</td>
                  <td>{flight.flightNo}</td>
                  <td>{flight.category}</td>
                  <td>{flight.time}</td>
                  <td>{flight.totalSeats}</td>
                  <td>{new Date(flight.date).toLocaleDateString()}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(flight)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(flight._id)}>Delete</button>
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
                <label>Date:</label>
                <input type="date" name="date" value={formValues.date} onChange={handleChange} required />
                <button className="save-btn" type="submit">Save</button>
                <button className="cancel-btn" type="button" onClick={() => setEditingFlight(null)}>Cancel</button>
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
