import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "../../style/navbar.css";
import logo from "../../assets/logo.png";
import { getUsersByUsername } from "../../controllers/userController";
import noImage from "../../assets/no_profile.png";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user")) || "";

    const isAuthPage = location.pathname === "/auth";
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const response = await getUsersByUsername(searchQuery, token);
            if (response?.success) {
                setSearchResults(response.data);
            }
        }
    };

    const handleResultClick = () => {
        setSearchResults([]);
        setIsSearchFocused(false);
    };

    const handleBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsSearchFocused(false);
            setSearchResults([]);
        }
    };

    if (isAuthPage) return null;

    return (
        <nav className="navbar">
            <div
                className="navbar-brand"
                onClick={() => navigate("/dashboard")}
            >
                <div className="logo">Home</div>
            </div>

            {/* Conditionally render the search bar if not on the auth page */}
            {!isAuthPage && (
                <div className="search-bar-container" onBlur={handleBlur}>
                    <form
                        className="search-bar"
                        onSubmit={handleSearchSubmit}
                        onFocus={() => setIsSearchFocused(true)}
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">
                            <FaSearch />
                        </button>
                    </form>

                    {isSearchFocused && searchResults.length > 0 && (
                        <div
                            className="search-results"
                            onMouseDown={(e) => e.preventDefault()} // Prevent blur when interacting with results
                        >
                            {searchResults.map((result) => (
                                <div
                                    key={result._id}
                                    className="search-result-item"
                                >
                                    <Link
                                        to={`/profile/${result._id}`}
                                        onClick={handleResultClick}
                                    >
                                        <img
                                            src={result.profileImage || noImage}
                                            alt={`${result.username}`}
                                            className="search-result-avatar"
                                        />
                                        <span>{result.username}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="navbar-content">
                {token && user?.username && (
                    <span className="welcome-message">
                        Welcome, {user.username}!
                    </span>
                )}

                {!isAuthPage &&
                    (token ? (
                        <>
                            <Link to="/profile" className="profile-link">
                                <FaUserCircle />
                                <span className="icon-label">Profile</span>
                            </Link>
                            <button
                                className="logout-button"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    navigate("/auth");
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="login-button"
                            onClick={() => navigate("/auth")}
                        >
                            Login
                        </button>
                    ))}
            </div>
        </nav>
    );
};

export default Navbar;
