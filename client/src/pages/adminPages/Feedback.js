import Layout from './Layout';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../CSS/Feedback.css"; // Import the feedback-specific CSS

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  
  async function fetch_data() {
    try {
        const response = await fetch('/api/feedback/getAllFeedback', { // Update the URL
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });

        const data = await response.json();

        if (response.ok) {
            setFeedbacks(data.feedbacks);
        } else {
            console.log(data);
            toast.error(data.message || "Error Occurred");
        }
    } catch (error) {
        console.log(error);
        toast.error("Network error, please try again later");
    }
  }

  useEffect(() => {
    fetch_data();
  }, []);

  return (
    <Layout >
      <div className="box">
        <h2>Feedback</h2>
        <div className="feedback-list">
          {feedbacks.map(feedback => (
            <div key={feedback._id} className="feedback-item">
              <p className="user">{feedback.user}</p>
              <p className="comment">"{feedback.subject}"</p>
              <p className="date">{new Date(feedback.date).toLocaleDateString()}</p>
              <p className="message">{feedback.message}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
