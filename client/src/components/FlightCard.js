import '../CSS/FlightCard.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

function FlightCard({username,isLoggedIn,flag, flightData }) {
    const navigate=useNavigate();

    const {id, flightNo, from, to, category, date, time, totalSeats } = flightData;

    async function book_flight(event){
        event.preventDefault();
        if(isLoggedIn==="false"){
            toast.error("Login first to book flight");
            navigate('/login');
            return ;
        }
        try {
            const response = await fetch('http://127.0.0.1:8080/api/bookflight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({username:username,flightNo})
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Successfully Booked Flight");
                navigate('/my_flights');
            } else {
                toast.error(data.message || "Authentication failed");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }
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
                    {flag?(
                        <>
                            <p><strong>Total Seats:</strong> {totalSeats}</p>
                            <button onClick={book_flight}>Book Flight</button>
                        </>
                        ):(
                            <></>
                        )}
                </div>
            </div>
        </div>
    );
}

export default FlightCard;
