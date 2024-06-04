import '../CSS/FlightCard.css';
import React, { useState, useContext } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../authContext';
import Loading from '../components/Loading';
import Navbar from '../components/Navbar';

function BookFlight({ bookFlightData }) {
    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false)
    }, 1500);
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const { flightNo, from, to, category, date, time, totalSeats } = bookFlightData;

    const [passengers, setPassengers] = useState([{ name: '', age: '', passportNo: '' }]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

    const handleConfirm = (event) => {
        event.preventDefault();
        setShowConfirmDialog(true);
    };

    const bookFlight = async () => {
        if (!isAuthenticated) {
            toast.error("Login first to book flight");
            navigate('/login');
            return;
        }
        setIsLoading(true)
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
                setTimeout(() => {
                    setIsLoading(false)
                  }, 1500);
                navigate('/my_flights');
                toast.success("Successfully Booked Flight");
            } else {
                toast.error(data.message || "Booking failed");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        } finally {
            setShowConfirmDialog(false);
        }
    };

    return (
        <div className={isLoading ? 'loading' : 'loaded'}>
            <Loading isLoading={isLoading} />
            <div className="content_">
                <Navbar />
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
                        <form onSubmit={handleConfirm}>
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
                            <button type="button" onClick={() => navigate(-1)}>Back</button>
                            <button type="submit">Book Flight</button>
                        </form>
                    </div>
                    {showConfirmDialog && (
                        <div className="confirm-dialog">
                            <p>Are you sure you want to book this flight?</p>
                            <button onClick={bookFlight}>Yes</button>
                            <button onClick={() => setShowConfirmDialog(false)}>No</button>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default BookFlight;
