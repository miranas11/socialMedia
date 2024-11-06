import React, { useEffect, useState } from "react";
import "../../style/auth.css";
import background from "../../assets/auth_bg.jpeg";
import { useNavigate } from "react-router-dom";
import {
    loginUser,
    registerUser,
    validateToken,
} from "../../controllers/userController";
import Loading from "../common/Loading";
import { useUser } from "../../context/UserContext";

const AuthScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const { setUser } = useUser();

    useEffect(() => {
        const validate = async () => {
            const user = JSON.parse(localStorage.getItem("user")) || "";
            const token = localStorage.getItem("token");
            if (user && token) {
                try {
                    const response = await validateToken(token);
                    console.log(response);
                    if (response) {
                        navigate("/dashboard");
                    }
                } catch (error) {
                    console.error("Token validation failed:", error.message);
                }
            }

            setIsLoading(false);
        };
        validate();
    }, [navigate]);

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleRegister = () => {
        setShowLogin(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="social-home">
            <div className="social-header">
                <div className="social-content-container">
                    {showLogin ? (
                        <Login
                            handleRegister={handleRegister}
                            setUser={setUser}
                        />
                    ) : (
                        <Register handleLogin={handleLogin} setUser={setUser} />
                    )}
                </div>
            </div>
        </div>
    );
};

const Login = ({ handleRegister, setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser({ email, password });
            if (response.success) {
                localStorage.setItem("token", response.data.token);
                // Set user context on successful login
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        username: response.data.username,
                        userId: response.data.userId,
                        email: response.data.email,
                    })
                );
                navigate("/dashboard");
            }
        } catch (error) {
            setError(error.message || "An error occurred during login.");
        }
    };

    return (
        <div className="social-login">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue your journey</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="social-btn">
                    Log In
                </button>
                <p className="account-option">
                    Don’t have an account?{" "}
                    <span onClick={handleRegister} className="social-link">
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
};

const Register = ({ handleLogin, setUser }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await registerUser({ username, email, password });
            if (response.success) {
                localStorage.setItem("token", response.data.token);
                // Set user context on successful registration
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        username: response.data.username,
                        userId: response.data.userId,
                        email: response.data.email,
                    })
                );
                navigate("/dashboard");
            }
        } catch (error) {
            setError(error.message || "An error occurred during registration.");
        }
    };

    return (
        <div className="social-register">
            <h2>Create Your Account</h2>
            <p>Sign up to start your social journey</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="social-btn">
                    Sign Up
                </button>
                <p className="account-option">
                    Already have an account?{" "}
                    <span onClick={handleLogin} className="social-link">
                        Log In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default AuthScreen;
