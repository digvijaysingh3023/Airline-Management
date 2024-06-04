import { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import '../CSS/Home.css';
import AuthContext from '../authContext';
import Loading from '../components/Loading';

function Home({ setViewFlightData }) {
    const navigate = useNavigate();
    const isAuthenticated = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);

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
            const response = await fetch('http://127.0.0.1:8080/api/searchFlight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.status === 200) {
                console.log(response.status);
                setViewFlightData(data.flights);
                navigate('/view_flights');
            } else {
                toast.error(data.message || "Error Occurred");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
        }
    }

    const backgroundStyle = {
        backgroundImage: 'url(/homeImage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // height: '100%',
        width: '100%',
      };
    

    return (
        <div className={isLoading ? 'loading' : 'loaded'}>
      <Loading isLoading={isLoading} />
      <div className="content_">
        
        <div>

        <Navbar/>
        <div className="flex h-screen items-center justify-center" style={backgroundStyle}>
            <div className="container">
                <form className="grid grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md bg-opacity-80" onSubmit={submitHandler}>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Source</p>
                        <input
                            type="text"
                            name="from"
                            onChange={changeHandler}
                            value={formData.from}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Destination</p>
                        <input
                            type="text"
                            name="to"
                            onChange={changeHandler}
                            value={formData.to}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Date</p>
                        <input
                            type="date"
                            name="date"
                            onChange={changeHandler}
                            value={formData.date}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Category</p>
                        <select
                            name="category"
                            onChange={changeHandler}
                            value={formData.category}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option>Economy</option>
                            <option>Business</option>
                            <option>First Class</option>
                        </select>
                    </div>
                    <div className="col-span-2 flex justify-center mt-4">
                         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">View Flights</button>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    );
}

export default Home;
