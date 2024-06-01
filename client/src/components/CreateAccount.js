import { useState } from "react";
import '../CSS/CreateAccount.css'; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateAccount({ setSignIn }) {
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleConfirmPassword(event) {
        setConfirmPassword(event.target.value);
    }

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: 0,
        address: "",
        email: "",
        profile: "client",
        username: "",
        password: "",
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
        if (confirmPassword !== formData.password) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                toast.success("Account created successfully");
                console.log(data);
                setSignIn("true");
            } else if (data.error === 'Username already exists') {
                toast.error("Username already exists");
            } else if (data.error === 'Email already exists') {
                toast.error("Email already exists");
            }
            else if (data.error === 'Passwords do not match!') {
                toast.error("Passwords do not match");
            }
             else {
                toast.error("An error occurred, please try again");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
            console.error("Network error:", error);
        }
    }

    return (
        <div className="create-account-container">
            <form onSubmit={submitHandler}>
                <div className="name-container">
                    <div>
                        <p>First Name</p>
                        <input 
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            value={formData.firstName}
                        ></input>
                    </div>
                    <div>
                        <p>Last Name</p>
                        <input 
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            value={formData.lastName}
                        ></input>
                    </div>
                </div>
                <div>
                    <p>Mobile No.</p>
                    <input 
                        type="number"
                        name="mobile"
                        onChange={changeHandler}
                        value={formData.mobile}
                    ></input>
                </div>
                <div>
                    <p>Address</p>
                    <input 
                        type="text"
                        name="address"
                        onChange={changeHandler}
                        value={formData.address}
                    ></input>
                </div>
                <div>
                    <p>Email</p>
                    <input 
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        value={formData.email}
                    ></input>
                </div>
                <div>
                    <p>Username</p>
                    <input 
                        type="text"
                        name="username"
                        onChange={changeHandler}
                        value={formData.username}
                    ></input>
                </div>
                <div className="password-container">
                    <div>
                        <p>Password</p>
                        <input 
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            value={formData.password}
                        ></input>
                    </div>
                    <div>
                        <p>Confirm Password</p>
                        <input 
                            type="password"
                            name="confirmPassword"
                            onChange={handleConfirmPassword}
                            value={confirmPassword}
                        ></input>
                    </div>
                </div>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccount;
