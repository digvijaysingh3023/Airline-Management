import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../authContext";
import "../../CSS/Layout.css";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [isMenuOpen, setMenuOpen] = useState(false);

    function handleChange(route) {
        navigate(`/${route}`);
        setMenuOpen(false); // Close the menu on navigation
    }

    function handleSignOut() {
        logout();
        navigate("/home");
        setMenuOpen(false);
    }

    function toggleMenu() {
        setMenuOpen(!isMenuOpen);
    }

    return (
        <>
            {/* Header with menu toggle */}
            <div className="header-layout">
                <div className="layout-left">
                    <h1>FlyNow</h1>
                </div>
                <div className="layout-middle">
                    <h2>Flight Management Dashboard</h2>
                </div>
                <div className="layout-right">
                    <Link to="/add_flight" className="btn-layout">
                        Add Flights
                    </Link>
                    <Link to="/admin_dashboard" className="btn-layout">
                        Admin
                    </Link>
                </div>
                {/* Toggle button for sidebar on small screens */}
                <span className="menu-toggle" onClick={toggleMenu}>
                    ☰
                </span>
            </div>

            {/* Overlay for small screen menu */}
            <div
                className={`menu-overlay ${isMenuOpen ? "open" : ""}`}
                onClick={toggleMenu}
            ></div>

            {/* Sidebar Menu */}
            <div className={`menu-layout ${isMenuOpen ? "open" : ""}`}>
                <ul>
                    <li onClick={() => handleChange("admin_dashboard")}>
                        <button>
                            <span className="fa-icon">📊</span> Dashboard
                        </button>
                    </li>
                    <li onClick={() => handleChange("flight_manage")}>
                        <button>
                            <span className="fa-icon">✈️</span> Manage Flights
                        </button>
                    </li>
                    <li onClick={() => handleChange("feedback")}>
                        <button>
                            <span className="fa-icon">💬</span> Feedback
                        </button>
                    </li>
                    <li onClick={() => handleChange("profile")}>
                        <button>
                            <span className="fa-icon">👤</span> Profile
                        </button>
                    </li>
                    <li onClick={handleSignOut}>
                        <button>
                            <span className="fa-icon">🚪</span> Sign Out
                        </button>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="content-layout">
                <div className="data-layout">{children}</div>
            </div>
        </>
    );
};

export default Layout;
