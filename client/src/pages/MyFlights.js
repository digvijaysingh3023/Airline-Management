import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyFlights({username,isLoggedIn,setIsLoggedIn}){
    const [myflights,setmyflights] = useState([])
    async function fetch_data(){
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
            } else {
                console.log(data);
                toast.error(data.message || "Error Occurred");
            }
        } catch (error) {
            console.log(error);
            toast.error("Network error, please try again later");
        }
    }
    useEffect(()=>{
        if(isLoggedIn==="true")fetch_data();
    },[])

    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        {
            isLoggedIn==="false"?(
                <h1>Login First to visit Flights</h1>
            ):(
                myflights.map((flightData,index)=>{
                    return <FlightCard username={username} isLoggedIn={isLoggedIn} flag={false} key={flightData.id} flightData={flightData}/>
                })
            )
        }
    </div>)
}
export default MyFlights;