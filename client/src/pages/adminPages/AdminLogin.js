import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import '../../CSS/adminlogin.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../authContext";
import Loading from "../../components/Loading";

function AdminLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    useState(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const changeHandler = (event) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmitAdmin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://airline-management-mauve.vercel.app/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data['user']);
                login(data['user']);
                toast.success("Login successful!");
                navigate('/admin_dashboard');
            } else {
                toast.error(data.message || "Authentication failed");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }
    };

    return (
        <div className={isLoading ? 'loading' : 'loaded'}>
            <Loading isLoading={isLoading} />
            {!isLoading && (
                <div className="content_">
                    <Navbar />
                    <div className="signin-container-admin">
                        <form onSubmit={handleSubmitAdmin}>
                            <div>
                                <p>Username</p>
                                <input
                                    type="text"
                                    name="username"
                                    onChange={changeHandler}
                                    value={formData.username}
                                    required
                                />
                            </div>
                            <div>
                                <p>Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    value={formData.password}
                                    required
                                />
                            </div>
                            <div>
                                <button type="submit">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminLogin;
