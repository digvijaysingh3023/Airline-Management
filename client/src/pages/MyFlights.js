import Navbar from '../components/Navbar';
import FlightCard from '../components/FlightCard';
import React from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyFlights({username,isLoggedIn,setIsLoggedIn}){
    let myFlights=[];
    async function fetch_data(){
        try {
            const response = await fetch('url to my flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username})
            });
    
            const data = await response.json();
    
            if (response.ok) {
                myFlights=data.flights;
            } else {
                toast.error(data.message || "Error Occurred");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
        }
    }
    if(isLoggedIn==="true")fetch_data();

    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        {
            isLoggedIn==="false"?(
                <h1>Login First to visit Flights</h1>
            ):(
                myFlights.map((flightData,index)=>{
                    return <FlightCard username={username} isLoggedIn={isLoggedIn} flag={false} key={flightData.id} flightData={flightData}/>
                })
            )
        }
    </div>)
}
export default MyFlights;