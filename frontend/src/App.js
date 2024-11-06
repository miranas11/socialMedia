import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "./components/screens/AuthScreen";
import { DashboardPage } from "./components/screens/DashboardPage";
import ProfilePage from "./components/screens/ProfilePage";
import NotFoundPage from "./components/screens/NotFoundPage";

import Navbar from "./components/common/Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />{" "}
                {/* Wildcard route */}
            </Routes>
        </Router>
    );
}

export default App;
