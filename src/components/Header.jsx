// src/components/Header.jsx
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

// Ahora el Header recibe el 'currentBeat' como prop
function Header({ currentBeat }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-logo">
          {/* Si existe un currentBeat, muestra su imagen. Si no, muestra la "Z". */}
          {currentBeat ? (
            <img src={currentBeat.coverSrc} alt="Carátula del beat actual" />
          ) : (
            'Z'
          )}
        </div>
        <span className="brand-name">ZaetaMusic</span>
      </div>
      <div className="header-controls">
        <button className="header-btn"><FontAwesomeIcon icon={faSearch} /></button>
        <button className="header-btn"><FontAwesomeIcon icon={faBars} /></button>
      </div>
    </header>
  );
}

export default Header;