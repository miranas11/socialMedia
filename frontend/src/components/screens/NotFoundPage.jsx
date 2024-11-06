import React from "react";
import { Link } from "react-router-dom";
import "../../style/notFoundPage.css";

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/dashboard" className="back-home-link">
                Go Back
            </Link>
        </div>
    );
};

export default NotFoundPage;
