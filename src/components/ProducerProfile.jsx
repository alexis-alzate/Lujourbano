// ProducerProfile.jsx
import React from 'react';
import './ProducerProfile.css';

function ProducerProfile({ producerImage, producerName }) {
  return (
    <div className="producer-profile">
      <div className="producer-avatar-wrapper">
        <img src={producerImage} alt={producerName} className="producer-avatar-img" />
      </div>
      <h2 className="producer-display-name">{producerName}</h2>
    </div>
  );
}

export default ProducerProfile;