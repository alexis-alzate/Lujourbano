import { useState, useEffect } from 'react';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward, faRandom, faRedo } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

function Player({ currentBeat, isPlaying, onPlayPause, onNext, onPrev, audioRef }) {
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
  }, [audioRef]);

  useEffect(() => {
    if (currentBeat) {
      document.title = `${currentBeat.title} - ${currentBeat.artist || 'Beat en Venta'}`;
    }
  }, [currentBeat]);

  const handleScrub = (e) => {
    if (duration) {
      const scrubTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
      audioRef.current.currentTime = scrubTime;
    }
  };

  if (!currentBeat) {
    return <div className="player-main">Cargando...</div>;
  }

  return (
    <div className="player-main">
        {/* --- CAMBIO AQUÍ: Implementamos el "Marco de Fotos" --- */}
        <div className={`album-cover-wrapper ${isPlaying ? 'playing' : ''}`}>
          <img src={currentBeat.coverSrc} alt={currentBeat.title} />
        </div>
        
        <div className="track-info">
            <h2 id="track-title">{currentBeat.title}</h2>
           {currentBeat.artist && <p className="artist-name">{currentBeat.artist}</p>}
            <p id="track-producer">{currentBeat.producer}</p>
            
            <div id="portfolio-details">
              
              {currentBeat.spotifyUrl && (
                <a href={currentBeat.spotifyUrl} target="_blank" rel="noopener noreferrer" className="spotify-btn">
                  <FontAwesomeIcon icon={faSpotify} /> 
                  <span>Escuchar en Spotify</span>
                </a>
              )}
            </div>
        </div>

        <div className="player-controls-container">
            <div className="progress-container">
                <span>{formatTime(trackProgress)}</span>
                <div className="progress-bar-wrapper" onClick={handleScrub}>
                    <div className="progress-bar" style={{ width: duration ? `${(trackProgress / duration) * 100}%` : '0%' }}></div>
                </div>
                <span>{formatTime(duration)}</span>
            </div>
            <div className="player-controls">
                <button className="control-btn"><FontAwesomeIcon icon={faRandom} /></button>
                <button className="control-btn" onClick={onPrev}><FontAwesomeIcon icon={faBackward} /></button>
                <button className="control-btn play-btn" onClick={onPlayPause}>
                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button className="control-btn" onClick={onNext}><FontAwesomeIcon icon={faForward} fixedWidth/></button>
                <button className="control-btn"><FontAwesomeIcon icon={faRedo} fixedWidth  /></button>
            </div>
        </div>
    </div>
  );
}

export default Player;