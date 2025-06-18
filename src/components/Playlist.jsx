import './Playlist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function Playlist({ beats, currentTrackIndex, onTrackSelect, isPlaying }) {
  return (
    <div className="playlist-container">
      <h3>Tu Librería</h3>
      <ul className="playlist">
        {beats.map((beat, index) => (
          <li key={beat.id} className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`} onClick={() => onTrackSelect(index)}>
            <img src={beat.coverSrc} alt={beat.title} className="playlist-item-cover" />
            <div className="playlist-title-container">
              <span className="playlist-item-title">{beat.title}</span>
              <span className="playlist-item-artist">{beat.artist || 'Beat en Venta'}</span>
            </div>
            {index === currentTrackIndex && isPlaying && <FontAwesomeIcon icon={faVolumeHigh} className="playing-icon"/>}
            <FontAwesomeIcon icon={faChevronRight} className="playlist-item-arrow"/>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Playlist;