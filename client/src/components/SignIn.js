import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/SignIn.css';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn({setIsAdminLoggedIn, setIsUserLoggedIn }) {
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

    async function HandleSubmitUser(event) {
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
<<<<<<< Updated upstream
                setIsLoggedIn(true);
=======
                setIsUserLoggedIn("true");
>>>>>>> Stashed changes
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

    async function HandleSubmitAdmin(event) {
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
                setIsAdminLoggedIn("true");
                toast.success("Login successful!");
                navigate('/admin_dashboard');
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
            <form>
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
                    <button onClick={HandleSubmitUser}>Sign In As User</button>
                    <button onClick={HandleSubmitAdmin}>Sign In as Admin</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
