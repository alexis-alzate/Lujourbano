// Player.jsx - REDISEÑADO CON COMPONENTES MODULARES
import { useState, useEffect } from 'react';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faRandom, faRedo } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import Visualizer from './Visualizer.jsx';
import ProducerProfile from './ProducerProfile.jsx';
import BehindTheTrack from './BehindTheTrack.jsx';

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

function Player({ currentBeat, isPlaying, onPlayPause, onNext, onPrev, audioRef, producerImage }) {
  const [trackProgress, setTrackProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => setTrackProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setAudioDuration);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', setAudioDuration);
    };
  }, [audioRef, currentBeat]);

  const handleScrub = (value) => {
    const scrubTime = value;
    audioRef.current.currentTime = scrubTime;
    setTrackProgress(scrubTime);
  };

  if (!currentBeat) {
    return <div className="player-main">Cargando...</div>;
  }

  return (
    <div className="player-main">
      {/* Perfil del productor */}
      <ProducerProfile 
        producerImage={producerImage || currentBeat.coverSrc}
        producerName="Producer Maw"
      />

      {/* Visualizador de onda */}
      <Visualizer 
        audioRef={audioRef} 
        isPlaying={isPlaying}
      />

      {/* Controles de reproducción */}
      <div className="player-controls-wrapper">
        {/* Tiempo y barra de progreso */}
        <div className="time-display">
          <span>{formatTime(trackProgress)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={trackProgress}
            onChange={(e) => handleScrub(e.target.value)}
            className="progress-slider"
          />
          <span>{formatTime(duration)}</span>
        </div>

        {/* Botones de control */}
        <div className="control-buttons">
          <button className="control-btn small-btn">
            <FontAwesomeIcon icon={faRandom} />
          </button>
          <button className="control-btn" onClick={onPrev}>
            <FontAwesomeIcon icon={faBackward} />
          </button>
          <button className="play-pause-btn" onClick={onPlayPause}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button className="control-btn" onClick={onNext}>
            <FontAwesomeIcon icon={faForward} />
          </button>
          <button className="control-btn small-btn">
            <FontAwesomeIcon icon={faRedo} />
          </button>
        </div>
      </div>

      {/* Info del track actual */}
      <div className="current-track-info">
        <h3 className="track-title">{currentBeat.title}</h3>
        <p className="track-subtitle">{currentBeat.producer}</p>
      </div>

      {/* Behind The Track */}
      <BehindTheTrack 
        description="The beat captures the essence of modern urban soundscapes with layered synthesizers and punchy 808s."
      />

      {/* Botones de acción */}
      <div className="action-buttons">
        {currentBeat.spotifyUrl ? (
          <a href={currentBeat.spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify-button">
            <FontAwesomeIcon icon={faSpotify} />
            <span>Listen on Spotify</span>
          </a>
        ) : (
          <button className="spotify-button" disabled style={{opacity: 0.6, cursor: 'not-allowed'}}>
            <FontAwesomeIcon icon={faSpotify} />
            <span>Listen on Spotify</span>
          </button>
        )}
        <button className="collab-button">
          Request Collaboration
        </button>
      </div>
    </div>
  );
}

export default Player;