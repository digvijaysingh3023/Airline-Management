import Navbar from '../components/Navbar';
import { useState,useContext } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/Contact.css'
import AuthContext from '../authContext';

function Contact({username}){
    const isAuthenticated = useContext(AuthContext);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        username:username
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
        if(!isAuthenticated){
            toast.error("Login to send message");
            return ;
        }
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
                toast.success("Message sent successfully");
            } else {
                toast.error(data.message || "Error Occured");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }
        
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            username:username
        });
    };


    return (<div>
        <Navbar/>

        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>If you have any questions, concerns, or feedback, please feel free to reach out to us using the form below. We are here to help and ensure you have a great experience with our airline.</p>
            <form onSubmit={submitHandler}>
                <div>
                    <p>Name</p>
                    <input 
                        type="text"
                        name="name"
                        onChange={changeHandler}
                        value={formData.name}
                        required
                    />
                </div>
                <div>
                    <p>Email</p>
                    <input 
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        value={formData.email}
                        required
                    />
                </div>
                <div>
                    <p>Subject</p>
                    <input 
                        type="text"
                        name="subject"
                        onChange={changeHandler}
                        value={formData.subject}
                        required
                    />
                </div>
                <div>
                    <p>Message</p>
                    <textarea 
                        name="message"
                        onChange={changeHandler}
                        value={formData.message}
                        required
                    />
                </div>
                <button type="submit">Send Message</button>
            </form>
        </div>
    </div>)
}
export default Contact;