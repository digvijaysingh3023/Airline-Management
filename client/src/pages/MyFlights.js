import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';
import Loading from '../components/Loading';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from '../authContext';

function MyFlights() {
    const [myflights, setmyflights] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const isAuthenticated = useContext(AuthContext)
    

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
        if (isAuthenticated) fetch_data();
    }, []);

    return (
        <div>
            <Navbar />
            {
                !isAuthenticated ? (
                    <h1>Login First to visit Flights</h1>
                ) : (
                    isLoading ? (
                        <Loading />
                    ) : (
                        myflights.map((flightData) => {
                            return <FlightCard flag={false} key={flightData.id} flightData={flightData} />
                        })
                    )
                )
            }
        </div>
    );
}

export default MyFlights;
