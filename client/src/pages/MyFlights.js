import Navbar from '../components/Navbar';
import React from 'react';

function MyFlights({isLoggedIn,setIsLoggedIn}){
    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

        This is My Flights Page
    </div>)
}
export default MyFlights;