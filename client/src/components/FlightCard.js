import '../CSS/FlightCard.css';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function BookFlight({ isLoggedIn, flightData }) {
    const navigate = useNavigate();
    const { flightNo, from, to, category, date, time, totalSeats } = flightData;

    const [passengers, setPassengers] = useState([{ name: '', age: '', passportNo: '' }]);

    const addPassenger = () => {
        if (passengers.length < 6) {
            setPassengers([...passengers, { name: '', age: '', passportNo: '' }]);
        } else {
            toast.error("Maximum 6 passengers allowed");
        }
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newPassengers = passengers.map((passenger, i) => (
            i === index ? { ...passenger, [name]: value } : passenger
        ));
        setPassengers(newPassengers);
    };

    const deletePassenger = (index) => {
        const newPassengers = passengers.filter((_, i) => i !== index);
        setPassengers(newPassengers);
    };

    const bookFlight = async (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            toast.error("Login first to book flight");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/api/bookflight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ flightNo, passengers })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Successfully Booked Flight");
                navigate('/my_flights');
            } else {
                toast.error(data.message || "Booking failed");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }
    };

    return (
        <div className="flight-details-card">
            <div className="flight-info">
                <h2>Flight {flightNo}</h2>
                <div className="inline-fields">
                    <p><strong>From:</strong> {from}</p>
                    <p><strong>To:</strong> {to}</p>
                </div>
                <div className="inline-fields">
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Time:</strong> {time}</p>
                </div>
                <p><strong>Category:</strong> {category}</p>
                <p><strong>Total Seats:</strong> {totalSeats}</p>
                <form onSubmit={bookFlight}>
                    {passengers.map((passenger, index) => (
                        <div key={index} className="passenger-details">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={passenger.name}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </label>
                            <label>
                                Age:
                                <input
                                    type="number"
                                    name="age"
                                    value={passenger.age}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </label>
                            <label>
                                Passport No:
                                <input
                                    type="text"
                                    name="passportNo"
                                    value={passenger.passportNo}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </label>
                            {passengers.length > 1 && (
                                <button type="button" onClick={() => deletePassenger(index)}>Delete Passenger</button>
                            )}
                        </div>
                    ))}
                    {passengers.length < 6 && (
                        <button type="button" onClick={addPassenger}>Add Passenger</button>
                    )}
                    <button type="submit">Book Flight</button>
                </form>
            </div>
        </div>
    );
}

export default BookFlight;
