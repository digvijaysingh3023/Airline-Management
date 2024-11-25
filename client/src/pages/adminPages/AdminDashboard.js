import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import "../../CSS/admindash.css";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [topFeedbacks, setTopFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch top 5-7 feedbacks from server
    async function fetchTopFeedbacks() {
      try {
        const response = await fetch(
          "https://airline-management-mauve.vercel.app/api/feedback/getAllFeedback",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          setTopFeedbacks(data.feedbacks.slice(0, 5)); // Limit to top 5 feedbacks
        } else {
          toast.error(data.message || "Failed to fetch feedback");
        }
      } catch (error) {
        toast.error("Network error, please try again later");
      } finally {
        setIsLoading(false);
      }
    }

    fetchTopFeedbacks();
  }, []);

  return (
    <div className={isLoading ? "loading" : "loaded"}>
      <Loading isLoading={isLoading} />
      <div className="admincontent">
        <Layout>
          <div className="container_dash">
            <div className="dashboard-stats">
              <div className="box-dash">
                <h2>Total Available Flights</h2>
                <h5>10</h5>
              </div>
              <div className="box-dash">
                <h2>Total Bookings</h2>
                <h5>25</h5>
              </div>
              <div className="box-dash">
                <h2>Active Users</h2>
                <h5>120</h5>
              </div>
            </div>
            <div className="feedback-section">
              <h3>Recent Feedback</h3>
              {topFeedbacks.length > 0 ? (
                <table className="feedback-table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topFeedbacks.map((feedback) => (
                      <tr key={feedback._id}>
                        <td>{feedback.user}</td>
                        <td>{feedback.subject}</td>
                        <td>{feedback.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No recent feedback available</p>
              )}
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default AdminDashboard;
