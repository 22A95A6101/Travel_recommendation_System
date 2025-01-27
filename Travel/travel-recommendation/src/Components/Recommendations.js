import React from 'react';
import './css/Recommendations.css';

const Recommendations = ({ recommendations }) => {
    if (recommendations.length === 0) {
        return <h3>No recommendations available. Try adjusting your preferences!</h3>;
    }

    return (
        <div className="recommendations-container">
            <h2>Recommended Places to Visit</h2>
            <ul>
                {recommendations.map((place, index) => (
                    <li key={index}>
                        <div className="card">
                            <h3>{place.Name}</h3>
                            <p>Type: {place.Type}</p>
                            <p>Description: {place.Description}</p>
                            <p>Reviews: {place.Reviews}</p>
                            <p>Distance: {place.Distance.toFixed(2)} km</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;
