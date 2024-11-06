import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import AuthScreen from "./components/screens/AuthScreen";
import { DashboardPage } from "./components/screens/DashboardPage";
import ProfilePage from "./components/screens/ProfilePage";
import NotificationsPage from "./components/screens/NotificationsPage";
import Navbar from "./components/common/Navbar";
import { validateToken } from "./controllers/userController";
import Loading from "./components/common/Loading";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
