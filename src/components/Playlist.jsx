// src/components/Playlist.jsx
import './Playlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faVolumeHigh, faSearch } from '@fortawesome/free-solid-svg-icons';

// Asegúrate de que reciba 'onSearchChange' desde App.jsx
function Playlist({ beats, currentTrackIndex, onTrackSelect, isPlaying, onSearchChange }) {
  return (
    <div className="playlist-container">
      <h3>Portafolio</h3>

      {/* --- BARRA DE BÚSQUEDA AÑADIDA --- */}
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input 
          type="text" 
          className="search-input"
          placeholder="Filtrar por nombre..."
          onChange={e => onSearchChange(e.target.value)} 
        />
      </div>
      {/* --- FIN DE LA BARRA DE BÚSQUEDA --- */}

      <ul className="playlist">
        {beats.map((beat) => (
          // El onClick ahora usa el 'id' para ser más robusto con el filtrado
          <li 
            key={beat.id} 
            className={`playlist-item ${beats[currentTrackIndex]?.id === beat.id ? 'active' : ''}`}
            onClick={() => onTrackSelect(beat.id)}
          >
            <img src={beat.coverSrc} alt={beat.title} className="playlist-item-cover" />
            <div className="playlist-title-container">
              <span className="playlist-item-title">{beat.title}</span>
              <span className="playlist-item-artist">{beat.artist || 'Beat en Venta'}</span>
            </div>
            {beats[currentTrackIndex]?.id === beat.id && isPlaying && <FontAwesomeIcon icon={faVolumeHigh} className="playing-icon"/>}
            <FontAwesomeIcon icon={faChevronRight} className="playlist-item-arrow"/>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Playlist;