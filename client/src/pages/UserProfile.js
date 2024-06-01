import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../CSS/UserProfile.css';

function UserProfile({isLoggedIn, setIsLoggedIn }) {
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobile: "",
        address: ""
    });

    async function fetch_data() {
        try {
            const response = await fetch('url for user data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            const data = await response.json();

            if (response.ok) {
                setUserData(data.user);
                setFormData({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    mobile: data.user.mobile,
                    address: data.user.address
                });
            } else {
                toast.error(data.message || "Error Occurred");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
        }
    }

    useEffect(() => {
        fetch_data();
    }, []);

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('url for updating user data', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Profile updated successfully!");
                setUserData(data.user);
                setIsEditing(false);
            } else {
                toast.error(data.message || "Error Occurred");
            }
        } catch (error) {
            toast.error("Network error, please try again later");
        }
    }

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {
                !isEditing ? (
                    <div className="user-profile-container">
                        <h2>User Profile</h2>
                        <div className="user-info">
                            <p><strong>First Name:</strong> {userData.firstName}</p>
                            <p><strong>Last Name:</strong> {userData.lastName}</p>
                            <p><strong>Mobile:</strong> {userData.mobile}</p>
                            <p><strong>Address:</strong> {userData.address}</p>
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                        </div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                ) : (
                    <div className='form-container'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <div>
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <div>
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={changeHandler}
                                    required
                                />
                            </div>
                            <button type="submit">Update</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    </div>
                )
            }
        </>
    );
}

export default UserProfile;
