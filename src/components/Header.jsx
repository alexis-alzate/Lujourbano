// Header.jsx
import React from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <div className="app-header">
      {/* Botones de ventana macOS */}
      <div className="window-controls">
        <div className="window-dot red"></div>
        <div className="window-dot yellow"></div>
        <div className="window-dot green"></div>
      </div>

      {/* Controles del lado derecho */}
      <div className="header-actions">
        <button className="header-icon-btn">
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button className="header-icon-btn user-btn">
          <FontAwesomeIcon icon={faUser} />
          <span className="notification-dot"></span>
        </button>
      </div>
    </div>
  );
}

export default Header;