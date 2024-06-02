import React, {useContext} from 'react';
import '../CSS/FlightCard.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../authContext';

function FlightCard({flightData , setBookFlightData}) {
    const  { isAuthenticated}  = useContext(AuthContext);
    const navigate=useNavigate();

    const { flightNo, from, to, category, date, time, totalSeats } = flightData;

    function book_flight(event){
        event.preventDefault();
        if(!isAuthenticated){
            toast.error("Login first to book flight");
            navigate('/login');
            return ;
        }
        setBookFlightData(flightData);
        navigate('/book_flight');
    }

    return (
        <div>
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
                    <button onClick={book_flight}>Book Flight</button>
                       
                </div>
            </div>
        </div>
    );
}

export default FlightCard;