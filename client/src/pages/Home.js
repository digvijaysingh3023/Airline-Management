import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import '../CSS/Home.css';

function Home({ setViewFlightData, isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        from: "",
        to: "",
        date: "",
        category: "Economy"
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function submitHandler(event) {
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
                setViewFlightData(data.flights);
                navigate('/view_flights');
            } else {
                toast.error(data.message || "Error Occurred");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
        }
        

        navigate('/view_flights');
    }

    return (
        <div className="container">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <form onSubmit={submitHandler}>
                <div>
                    <p>Source</p>
                    <input
                        type="text"
                        name="from"
                        onChange={changeHandler}
                        value={formData.from}
                        required
                    />
                </div>
                <div>
                    <p>Destination</p>
                    <input
                        type="text"
                        name="to"
                        onChange={changeHandler}
                        value={formData.to}
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
                <div>
                    <p>Category</p>
                    <select
                        name="category"
                        onChange={changeHandler}
                        value={formData.category}
                        required
                    >
                        <option>Economy</option>
                        <option>Business</option>
                        <option>First Class</option>
                    </select>
                </div>
                <button type="submit">View Flights</button>
            </form>
        </div>
    );
}

export default Home;
