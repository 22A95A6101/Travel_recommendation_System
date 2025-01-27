import React, { useState } from 'react';
import './css/TravelForm.css';

const TravelForm = ({ onSubmit }) => {
    const [type, setType] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Trigger the onSubmit function passed via props and send the form data
        onSubmit({ type, lat, lon, rating });
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);  // Set the latitude
                    setLon(position.coords.longitude); // Set the longitude
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Could not get location. Please enter it manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div>
            <div> <h2 style={{
    textAlign: 'center', 
    color: '#111e49', 
    fontSize: '2em', 
    fontWeight: 'bold', 
    margin: '20px 0', 
    padding: '10px', 
    // borderBottom: '2px solid #111e49', 
    backgroundColor: '#f4f4f4', 
    borderRadius: '8px', 
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
}}>
    Find your destinations by your interests
</h2></div>
        <form className="travel-form" onSubmit={handleSubmit}>
            <label>
                Preference Type:
                <select value={type} onChange={(e) => setType(e.target.value)} required>
                    <option value="" disabled>Select your preference</option>
                    <option value="sea">Sea</option>
                    <option value="temple">Temple</option>
                    <option value="garden">Garden</option>
                    <option value="mountains">Mountains</option>
                    <option value="museum">Museum</option>
                    <option value="cherry blossoms">Cherry Blossoms</option>
                </select>
            </label>
            <br />
            <label>
                Latitude:
                <input 
                    type="text" 
                    value={lat} 
                    onChange={(e) => setLat(e.target.value)} 
                    placeholder="Enter latitude or use current location" 
                    required 
                />
            </label>
            <br />
            <label>
                Longitude:
                <input 
                    type="text" 
                    value={lon} 
                    onChange={(e) => setLon(e.target.value)} 
                    placeholder="Enter longitude or use current location" 
                    required 
                />
            </label>
            <br />
            <label>
                Minimum Rating:
                <input 
                    type="number" 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)} 
                    placeholder="Enter minimum rating (1-5)" 
                    required 
                   
                />
            </label>
            <br />
            <button type="button" onClick={handleGetLocation}>Use Current Location</button>
            <br />
            <button type="submit">Get Recommendations</button>
        </form>
        </div>
    );
};

export default TravelForm;
