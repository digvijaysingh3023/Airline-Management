import '../CSS/FlightCard.css';
import React from 'react';

function MyFlightCard({ flightData }) {
    console.log(flightData)
    const { flightNo, from, to, category, date, time, passengers } = flightData;

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
                <h3>Passengers</h3>
                <ul>
                    {passengers?(
                    passengers.map((passenger, index) => (
                        <li key={index}>
                            <p><strong>Name:</strong> {passenger.name}</p>
                            <p><strong>Age:</strong> {passenger.age}</p>
                            <p><strong>Passport No:</strong> {passenger.passportNo}</p>
                        </li>
                    ))):(<></>)}
                </ul>
            </div>
        </div>
    );
}

export default MyFlightCard;
