import Layout from './Layout';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../CSS/Feedback.css"; // Import the feedback-specific CSS

const Feedback = ({setIsAdminLoggedIn}) => {
  const [feedbacks,setfeedbacks] = useState([
    {
      id: 1,
      user: 'John Doe',
      subject: 'Great service and friendly staff!',
      message: '2024-05-01',
    },
    {
      id: 2,
      user: 'Jane Smith',
      subject: 'Flight was delayed but the support was excellent.',
      message: '2024-05-15',
    },
    {
      id: 3,
      user: 'Bob Johnson',
      subject: 'Comfortable seats and good food.',
      message: '2024-05-20',
    },
  ]);
  async function fetch_data(){
    try {
        const response = await fetch('url to get feedback data', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (response.ok) {
          setfeedbacks(data.feedbacks);
        } else {
            console.log(data);
            toast.error(data.message || "Error Occurred");
        }
    } catch (error) {
        console.log(error);
        toast.error("Network error, please try again later");
    }
}
useEffect(()=>{
    fetch_data();
},[])

  return (
    <Layout setIsAdminLoggedIn={setIsAdminLoggedIn}>
      <div className="box">
        <h2>Feedback</h2>
        <div className="feedback-list">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="feedback-item">
              <p className="user">{feedback.user}</p>
              <p className="comment">"{feedback.subject}"</p>
              <p className="date">{feedback.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
