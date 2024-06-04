import Navbar from '../components/Navbar';
import { useState, useContext } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/Contact.css';
import AuthContext from '../authContext';
import Loading from '../components/Loading';

function Contact({ username }) {
    const isAuthenticated = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    setTimeout(() => {
        setIsLoading(false)
    }, 1500);

    const [formData, setFormData] = useState({
        user: "",
        email: "",
        subject: "",
        message: "",
        username: username
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    async function submitHandler(event) {
        setIsLoading(true)
        event.preventDefault();
        if (!isAuthenticated) {
            toast.error("Login to send message");
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/feedback/addFeedback', { // Update the URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setTimeout(() => {
                    setIsLoading(false)
                  }, 2000);
                toast.success("Message sent successfully");
            } else {
                setTimeout(() => {
                    setIsLoading(false)
                  }, 2000);
                toast.error(data.message || "Error Occurred");

            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }

        setFormData({
            user: "",
            email: "",
            subject: "",
            message: "",
            username: username
        });
    };

    const backgroundStyle = {
        backgroundImage: 'url(/ContactImage.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

    return (
        <div className={isLoading ? 'loading' : 'loaded'}>
        <Loading isLoading={isLoading} />
        <div className="content_">


        <div className='h-screen' style={backgroundStyle}>
            <Navbar/>
            <div className='h-[70px]'></div>
            <div className="contact-container max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md bg-opacity-90">
                <h1 className="text-3xl font-bold text-center mb-4">Contact Us</h1>
                <p className="text-gray-600 text-center mb-8">If you have any questions, concerns, or feedback, please feel free to reach out to us using the form below. We are here to help and ensure you have a great experience with our airline.</p>
                <form onSubmit={submitHandler}>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Name</p>
                        <input 
                            type="text"
                            name="name"
                            onChange={changeHandler}
                            value={formData.name}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Email</p>
                        <input 
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            value={formData.email}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Subject</p>
                        <input 
                            type="text"
                            name="subject"
                            onChange={changeHandler}
                            value={formData.subject}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold mb-2">Message</p>
                        <textarea 
                            name="message"
                            onChange={changeHandler}
                            value={formData.message}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
        <div>
           
                   
                   </div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
