// src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';
import ProducerProfile from './components/ProducerProfile.jsx';
import Playlist from './components/Playlist.jsx'; 
import Waveform from './components/Waveform_f.jsx'; // 1. IMPORTAMOS EL NUEVO COMPONENTE

function App() {
  const [beats, setBeats] = useState([
    {
      id: 1,
      title: "Tengo una Reina valera",
      producer: "Producido por Zaeta Music",
      artist: "Jesus Family",
      audioSrc: "/audio/Reina_valera.mp3",
      coverSrc: "/covers/cover1.jpg", 
      genre: "Trap"
    },
    {
      id: 2,
      title: "Hoy me levante",
      producer: "Producido por Zaeta Music",
      artist: "Polimaba",
      audioSrc: "/audio/Hoy me levante.mp3",
      coverSrc: "/covers/cover2.jpg",
      genre: "Trap"
    },
    {
      id: 3,
      title: "Mano arriba",
      producer: "Producido por Zaeta Music",
      artist: "Julian Ramos",
      // CORRECCIÓN: Asegúrate que el nombre del archivo sea el correcto
      audioSrc: "/audio/Mano arriba.wav", 
      coverSrc: "/covers/cover3.jpg",
      genre: "Trap"
    }
  ]);

  // --- Lógica del reproductor ---
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // 2. HEMOS QUITADO el audioRef y los useEffect que lo controlaban.
  //    Ahora Waveform se encargará de eso.

  // Los handlers siguen funcionando igual, solo cambian el estado.
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % beats.length);
    setIsPlaying(true); // Opcional: que empiece a sonar al cambiar
  };
  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + beats.length) % beats.length);
    setIsPlaying(true); // Opcional: que empiece a sonar al cambiar
  };
  
  const handleTrackSelect = (id) => {
    const originalIndex = beats.findIndex(beat => beat.id === id);
    if(originalIndex !== -1) {
      setCurrentTrackIndex(originalIndex);
      setIsPlaying(true);
    }
  };

  // --- El return final con la estructura completa ---
  return (
    <main className="main-window">

      {/* --- COLUMNA IZQUIERDA --- */}
      <div className="producer-column">
        <ProducerProfile 
          currentBeat={beats[currentTrackIndex]}
          // 3. AÑADIMOS EL WAVEFORM AQUÍ
          waveformComponent={
            <Waveform 
              audioUrl={beats[currentTrackIndex].audioSrc}
              isPlaying={isPlaying}
            />
          }
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrev={handlePrevTrack}
        />
      </div>

      {/* --- COLUMNA DERECHA --- */}
      <div className="playlist-column">
        <Playlist
          beats={beats}
          onTrackSelect={handleTrackSelect}
          currentTrackIndex={currentTrackIndex}
          isPlaying={isPlaying}
        />
      </div>

    </main>
  );
}

export default App;