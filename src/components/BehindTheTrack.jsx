    // BehindTheTrack.jsx
    import React from 'react';
    import './BehindTheTrack.css';

    function BehindTheTrack({ description }) {
    return (
        <div className="behind-track">
        <h3 className="behind-track-title">Behind The Track</h3>
        <p className="behind-track-description">
            {description || "The story behind this beat will appear here."}
        </p>
        
        {/* Indicador AI */}
        <div className="ai-indicator">
            <span className="ai-text">LJ</span>
        </div>
        </div>
    );
    }

    export default BehindTheTrack;