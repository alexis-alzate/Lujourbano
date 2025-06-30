    // src/components/Header.jsx
    import React from 'react';
    import './Header.css';

    function Header({ name, imageUrl }) {
    return (
        <div className="header-container">
        <img src={imageUrl} alt={name} className="header-avatar" />
        <h1 className="header-name">{name}</h1>
        </div>
    );
    }

    export default Header;