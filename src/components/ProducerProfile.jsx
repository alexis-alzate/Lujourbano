    // src/components/ProducerProfile.jsx

    import React from 'react';
    import './ProducerProfile.css';
    import Header from './Header';
    // El nombre de tu archivo de waveform, asegúrate que sea correcto
    import Waveform from './Waveform_f'; 

    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
    import { faPlay, faPause, faBackwardStep, faForwardStep, faRepeat } from '@fortawesome/free-solid-svg-icons';

    // Recibimos las props que nos manda App.jsx
    function ProducerProfile({ currentBeat, isPlaying, onPlayPause, onNext, onPrev }) {

    const producer = {
        name: "Producer Maw",
        imageUrl: "/images/profile.png"
    };

    // Usamos el 'beat' actual que nos llega por props
    const track = currentBeat || { title: "Selecciona una canción" }; 

    return (
        <div className="producer-profile-container">

        <Header name={producer.name} imageUrl={producer.imageUrl} />

        {/* AQUÍ ESTÁ LA CORRECCIÓN:
            Le pasamos a Waveform la URL del audio y el estado de reproducción.
            El 'track.audioSrc &&' es para asegurarnos de que solo se muestre si hay una canción seleccionada.
        */}
        {track.audioSrc && (
            <Waveform 
            audioUrl={track.audioSrc}
            isPlaying={isPlaying}
            />
        )}

        <div className="player-controls">
            <span className="time-display">0:00</span>
            <button onClick={onPrev} className="control-btn"><FontAwesomeIcon icon={faBackwardStep} /></button>
            <button onClick={onPlayPause} className="control-btn play-pause-btn"><FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="lg" /></button>
            <button onClick={onNext} className="control-btn"><FontAwesomeIcon icon={faForwardStep} /></button>
            <button className="control-btn"><FontAwesomeIcon icon={faRepeat} /></button>
            <span className="time-display">3:00</span>
        </div>

        <div className="behind-the-track">
            <h2>{track.title}</h2>
            <p>This is where the story behind the track will appear.</p>
        </div>

        <div className="action-buttons">
            <button className="spotify-btn">Listen on Spotify</button>
            <button className="collab-btn">Request Collaboration</button>
        </div>

        </div>
    );
    }

    export default ProducerProfile; 