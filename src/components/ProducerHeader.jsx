    // src/components/ProducerHeader.jsx
    import React from 'react';
    import './ProducerHeader.css'; // Creamos este CSS en el siguiente paso
    import producerImage from '../assets/img/cover1.jpg'; // Reemplaza con tu imagen

    function ProducerHeader({ producerName = 'Producer Name', producerImageSrc = producerImage }) {
    return (
        <div className="producer-header">
        <div className="producer-image-wrapper">
            <img src={producerImageSrc} alt={producerName} className="producer-image" />
        </div>
        <h2 className="producer-name">{producerName}</h2>
        </div>
    );
    }

    export default ProducerHeader;