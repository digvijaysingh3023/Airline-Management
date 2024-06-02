import Navbar from '../components/Navbar';
import MyFlightCard from '../components/MyFlightCard';
import Loading from '../components/Loading';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyFlights({ isLoggedIn, setIsLoggedIn }) {
    const [myflights, setmyflights] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    async function fetch_data() {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/getbookedflights', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setmyflights(data.flights);
                setIsLoading(false); 
            } else {
                console.log(data);
                toast.error(data.message || "Error Occurred");
                setIsLoading(false); 
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            setIsLoading(false); 
        }
    }

    useEffect(() => {
        if (isLoggedIn) fetch_data();
    }, [isLoggedIn]);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {
                !isLoggedIn ? (
                    <h1>Login First to visit Flights</h1>
                ) : (
                    isLoading ? (
                        <Loading />
                    ) : (
                        myflights.map((flightData) => {
                            return <MyFlightCard isLoggedIn={isLoggedIn} key={flightData.id} flightData={flightData} />
                        })
                    )
                )
            }
        </div>
    );
}

export default MyFlights;
