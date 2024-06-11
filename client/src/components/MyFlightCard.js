import '../CSS/MyFlightCard.css';
import React from 'react';
import route_plan from '../images/route-plan.png'

function MyFlightCard({ flightData }) {
    //temporary flight data
    flightData = {
        flightNo: 'FK234',
        from: 'DUB',
        to: 'SHJ',
        category: 'Economy',
        date: '14 August, 2023',
        departureTime: '12:00',
        duration: '0h 50m',
        arrivalTime: '12:50',
        price: 240,
        aircraft:'Boeing 777-90',
        airline:'United Dubai Airlines',
        stops:1
    };

    const { flightNo, from, to, category, date, departureTime, duration, arrivalTime, price, aircraft, airline, stops } = flightData;

    return (
        <div className="flight-booking-detail">
            <div className="flight-booking-title">
                <div className="booking-title-text">Your Booking Detail</div>
            </div>
            <div className="booking-detail-box">
                <div className="booking-flight-detail">
                    <div className="booking-flight-departure">
                        <h5 className="booking-departure-time">12:00</h5>
                        <h5 className="booking-departure-location">DUB</h5>
                    </div>
                    <div className="booking-flight-route">
                        <span className="route-text">From</span>
                        <div className="route-info">
                            <h5 className="route-duration">0h 50m</h5>
                            <img src={route_plan} alt="Route Plan" className="route-plan-img"/>
                            <h6 className="route-stops">1 Stop</h6>
                        </div>
                        <span className="route-text">To</span>
                    </div>
                    <div className="booking-flight-departure">
                        <div className="booking-arrival-time">12:50</div>
                        <div className="booking-arrival-location">SHJ</div>
                    </div>
                </div>
                <div className="booking-dates">
                    <div className="booking-date-info">
                        <h6 className="date-label">Departure</h6>
                        <h5 className="date-text">14 Aug, 2023</h5>
                    </div>
                    <div className="vr-line"></div>
                    <div className="booking-date-info">
                        <h6 className="date-label">Arrival</h6>
                        <h5 className="date-text">14 Aug, 2023</h5>
                    </div>
                </div>
                <hr className="separator-line"/>
                <div className="booking-flight-text">
                    <h6 className="operator-info">Tpm Line</h6>
                    <h6 className="operator-info">Operated by Feel Dubai Airlines</h6>
                    <h6 className="operator-info">Economy | Flight FK234 | Aircraft BOEING 777-90</h6>
                    <h6 className="operator-info">Adult(s): 25KG luggage free</h6>
                </div>
            </div>
        </div>

    );
}

export default MyFlightCard;
