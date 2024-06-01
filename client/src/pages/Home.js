// import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/Home.css';


function Home({isLoggedIn,setIsLoggedIn}){
    const [formData, setFormData] = useState({
        source: "",
        destination: "",
        date: "",
    });

    function changeHandler(event){
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    async function submitHandler(event){
        event.preventDefault();
        try {
            const response = await fetch('url to send data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                
            } else {
                toast.error(data.message || "Error Occured");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
        }
        
        setFormData({
            source: "",
            destination: "",
            date: "",
        });
    };

    return (<div>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <form onSubmit={submitHandler}>
                <div>
                    <p>Source</p>
                    <input 
                        type="text"
                        source="source"
                        onChange={changeHandler}
                        value={formData.source}
                        required
                    />
                </div>
                <div>
                    <p>Destination</p>
                    <input 
                        type="text"
                        name="destination"
                        onChange={changeHandler}
                        value={formData.destination}
                        required
                    />
                </div>
                <div>
                    <p>Date</p>
                    <input 
                        type="date"
                        name="date"
                        onChange={changeHandler}
                        value={formData.date}
                        required
                    />
                </div>
                <button type="submit">View Flights</button>
            </form>
    </div>)
}
export default Home;