import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthScreen from "./components/screens/AuthScreen";
import { DashboardPage } from "./components/screens/DashboardPage";
import ProfilePage from "./components/screens/ProfilePage";

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
            </Routes>
        </Router>
    );
}

export default App;
