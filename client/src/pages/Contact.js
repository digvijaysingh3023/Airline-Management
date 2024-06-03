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

    return (
        <div>
            <div className={isLoading ? 'loading' : 'loaded'}>
                <Loading isLoading={isLoading} />
                <div className="content_">
                    <Navbar />
                    <div className="contact-container">
                        <h1>Contact Us</h1>
                        <p>If you have any questions, concerns, or feedback, please feel free to reach out to us using the form below. We are here to help and ensure you have a great experience with our airline.</p>
                        <form onSubmit={submitHandler}>
                            <div>
                                <p>Name</p>
                                <input
                                    type="text"
                                    name="user"
                                    onChange={changeHandler}
                                    value={formData.user}
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
                </div>
            </div>
        </div>
    )
}

export default Contact;
