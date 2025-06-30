// src/components/Playlist.jsx

import React from 'react';
import './Playlist.css'; // Usaremos un nuevo CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlay } from '@fortawesome/free-solid-svg-icons';

// Le pasamos la lista de beats y las funciones necesarias
function Playlist({ beats, onTrackSelect, currentTrackIndex, isPlaying }) {
return (
<div className="playlist-container">
    {/* --- Barra de Búsqueda --- */}
    <div className="search-bar">
    <FontAwesomeIcon icon={faSearch} className="search-icon" />
    <input type="text" placeholder="Search Producer..." />
    </div>

    {/* --- Lista de Canciones --- */}
    <ul className="track-list">
    {beats.map((beat, index) => (
        <li 
        key={beat.id} 
        // La clase cambia si la canción está activa
        className={`track-item ${index === currentTrackIndex ? 'active' : ''}`}
        onClick={() => onTrackSelect(beat.id)} // Ojo: Pasamos el ID, no el index
        >
        <img src={beat.coverSrc} alt={beat.title} className="track-item-cover" />
        <div className="track-item-info">
            <span className="track-item-title">{beat.title}</span>
            <span className="track-item-producer">{beat.producer}</span>
        </div>
        {/* Mostramos un ícono de play si la canción está activa y sonando */}
        {index === currentTrackIndex && isPlaying && (
            <FontAwesomeIcon icon={faPlay} className="playing-icon" />
        )}
        </li>
    ))}
    </ul>
</div>
);
}

export default Playlist;