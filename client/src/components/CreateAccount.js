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
        mobile: "",
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
            }
            else if(data.message){
                toast.error(data.message)
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
        <div className="create-account-container bg-[#ebe8e8] bg-opacity-40 rounded-2xl">
            <form className="m-0 px-4 pb-6" onSubmit={submitHandler}>
                <div className="name-container flex gap-2 pt-4">
                    <div>
                        <p>First Name</p>
                        <input 
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            value={formData.firstName}
                            required
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
                        type="tel"
                        name="mobile"
                        onChange={changeHandler}
                        value={formData.mobile}
                        required
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
                        required
                    ></input>
                </div>
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
                <div className="password-container flex gap-2">
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
                        <p>Confirm Password</p>
                        <input 
                            type="password"
                            name="confirmPassword"
                            onChange={handleConfirmPassword}
                            value={confirmPassword}
                            required
                        ></input>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit">Create Account</button>
                </div>
               
            </form>
        </div>
    );
}

export default CreateAccount;
