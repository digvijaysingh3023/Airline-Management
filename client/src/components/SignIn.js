import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/SignIn.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    async function HandleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token',data['user'])
                setIsLoggedIn("true");
                toast.success("Login successful!");
                navigate('/home');
            } else {
                toast.error(data.message || "Authentication failed");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }
    }

    return (
        <div className="signin-container">
            <form onSubmit={HandleSubmit}>
                <div>
                    <p>Username</p>
                    <input
                        type="text"
                        name="username"
                        onChange={changeHandler}
                        value={formData.username}
                        required
                    ></input>
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        onChange={changeHandler}
                        value={formData.password}
                        required
                    ></input>
                </div>
                <div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
