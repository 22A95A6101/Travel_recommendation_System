import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Footer from './Components/Footer';
import TravelForm from './Components/TravelForm';
import Recommendations from './Components/Recommendations';
import axios from 'axios';  // Using Axios for HTTP requests
import "./App.css";


const App = () => {
    const [recommendations, setRecommendations] = useState([]);

    // Function to fetch recommendations from the backend
    const fetchRecommendations = async (data) => {
        try {
            // Axios POST request to the backend with form data
            const response = await axios.post('http://127.0.0.1:5000/', new URLSearchParams(data));
            setRecommendations(response.data.recommendations || []);  // Set recommendations
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    return (
        <Router>
            <Navbar />  {/* Navigation Bar */}

            <Routes>
                <Route path="/" element={<Home />} />  {/* Home Route */}
                <Route path="/Recommend" element={
                    <div className="container">
                        <TravelForm onSubmit={fetchRecommendations} />  {/* Travel form for user input */}
                        <Recommendations recommendations={recommendations} />  {/* Display recommendations */}
                    </div>
                } />
                <Route path="/login" element={<Login />} />  {/* Login Route */}
                <Route path="/register" element={<Register />} />  {/* Register Route */}
            </Routes>

            <Footer />  {/* Footer */}
        </Router>
    );
};

export default App;
